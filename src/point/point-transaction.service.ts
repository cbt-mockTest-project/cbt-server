import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { PointTransaction } from './entities/point-transaction.entity';
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
    queryRunnerOfParent?: QueryRunner,
  ): Promise<CreatePointTransactionOutput> {
    const { point, type, description } = createPointTransactionInput;
    const queryRunner =
      queryRunnerOfParent ||
      this.pointTransactions.manager.connection.createQueryRunner();
    if (!queryRunnerOfParent) {
      await queryRunner.connect();
      await queryRunner.startTransaction();
    }

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

      if (pointBalance) {
        await queryRunner.manager.update(
          PointBalance,
          { id: pointBalance.id },
          { balance: pointBalance.balance + point },
        );
      }
      if (!pointBalance) {
        await queryRunner.manager.save(
          this.pointBalances.create({
            balance: point,
            user,
          }),
        );
      }
      const pointTransaction = await queryRunner.manager.save(
        newPointTransaction,
      );
      if (!queryRunnerOfParent) {
        await queryRunner.commitTransaction();
      }
      return { ok: true, pointTransaction };
    } catch (e) {
      await queryRunner.rollbackTransaction();
      return { ok: false, error: 'Cannot create transaction' };
    } finally {
      if (!queryRunnerOfParent) {
        await queryRunner.release();
      }
    }
  }
}
