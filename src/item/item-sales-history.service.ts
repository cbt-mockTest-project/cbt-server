import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemSalesHistory } from './entities/item-sales-history.entity';
import {
  CreateItemSalesHistoryInput,
  CreateItemSalesHistoryOutput,
} from './dtos/item-sales-history/createItemSalesHistory.dto';
import { PaymentService } from 'src/payments/payment.service';
import { User } from 'src/users/entities/user.entity';
import { GetItemSalesHistoriesForItemOwnerOutput } from './dtos/item-sales-history/getItemSalesHistoriesForItemOwner';
@Injectable()
export class ItemSalesHistoryService {
  constructor(
    @InjectRepository(ItemSalesHistory)
    private readonly itemSalesHistories: Repository<ItemSalesHistory>,
    private readonly paymentService: PaymentService,
  ) {}

  async createItemSalesHistory(
    createItemSalesHistoryInput: CreateItemSalesHistoryInput,
    user: User,
  ): Promise<CreateItemSalesHistoryOutput> {
    const queryRunner =
      this.itemSalesHistories.manager.connection.createQueryRunner();
    try {
      const { itemId, price, orderId, productName, receiptId } =
        createItemSalesHistoryInput;
      await queryRunner.startTransaction();
      const res = await this.paymentService.createPayment(
        {
          price,
          orderId,
          productName,
          receiptId,
        },
        user,
        queryRunner,
      );
      if (!res.ok) {
        await queryRunner.rollbackTransaction();
        return {
          ok: false,
          error: res.error,
        };
      }
      await queryRunner.manager.save(ItemSalesHistory, {
        item: { id: itemId },
        buyer: { id: user.id },
        payment: { id: res.payment.id },
      });
      await queryRunner.commitTransaction();
    } catch {
      await queryRunner.rollbackTransaction();
      return {
        ok: false,
        error: 'Could not create item sales history',
      };
    } finally {
      await queryRunner.release();
    }
  }

  async getItemSalesHistoriesForItemOwner(
    user: User,
  ): Promise<GetItemSalesHistoriesForItemOwnerOutput> {
    try {
      const itemSalesHistories = await this.itemSalesHistories.find({
        where: {
          item: {
            user: {
              id: user.id,
            },
          },
        },
        relations: {
          buyer: true,
          item: true,
          payment: true,
        },
      });
      return {
        ok: true,
        itemSalesHistories,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not get item sales histories',
      };
    }
  }
}
