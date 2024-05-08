import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  PointTransaction,
  TransactionType,
} from './entities/point-transaction.entity';
import {
  CreatePointTransactionInput,
  CreatePointTransactionOutput,
} from './dtos/point-transaction/create-point-transaction.dto';
import { User } from 'src/users/entities/user.entity';
import { PointBalance } from './entities/point-balance.entity';

@Injectable()
export class PointTransactionService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointTransactions: Repository<PointTransaction>,
    @InjectRepository(PointBalance)
    private readonly pointBalances: Repository<PointBalance>,
  ) {}
  async createPointTransaction(
    user: User,
    createPointTransactionInput: CreatePointTransactionInput,
  ): Promise<CreatePointTransactionOutput> {
    const { point, type, description } = createPointTransactionInput;
    const queryRunner =
      this.pointTransactions.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newPointTransaction = this.pointTransactions.create({
        point,
        type,
        description,
        user,
      });
      const pointBalance = await this.pointBalances.findOne({
        where: {
          user: {
            id: user.id,
          },
        },
      });
      const newBalance = this.pointBalances.create({
        balance: pointBalance.balance + point,
        user,
      });
      await queryRunner.manager.save(newBalance);
      await queryRunner.manager.save(newPointTransaction);
      await queryRunner.commitTransaction();
      return { ok: true };
    } catch {
      await queryRunner.rollbackTransaction();
      return { ok: false, error: 'Cannot create transaction' };
    } finally {
      await queryRunner.release();
    }
  }
}
