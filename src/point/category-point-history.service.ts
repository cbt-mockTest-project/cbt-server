import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { CategoryPointHistory } from './entities/category-point-history.entity';
import {
  CreateCategoryPointHistoryInput,
  CreateCategoryPointHistoryOutput,
} from './dtos/category-point-history/create-category-point-history.dto';
import { User } from 'src/users/entities/user.entity';
import { PointTransactionService } from './point-transaction.service';

@Injectable()
export class CategoryPointHistoryService {
  constructor(
    @InjectRepository(CategoryPointHistory)
    private readonly categoryPointHistory: Repository<CategoryPointHistory>,
    private readonly pointTransactionService: PointTransactionService,
  ) {}

  async createCategoryPointHistory(
    createCategoryPointHistoryInput: CreateCategoryPointHistoryInput,
    user: User,
    queryRunnerOfParent?: QueryRunner,
  ): Promise<CreateCategoryPointHistoryOutput> {
    const { categoryId, type, point, description } =
      createCategoryPointHistoryInput;
    const queryRunner =
      queryRunnerOfParent ||
      this.categoryPointHistory.manager.connection.createQueryRunner();
    if (!queryRunnerOfParent) {
      await queryRunner.connect();
      await queryRunner.startTransaction();
    }

    try {
      const newCategoryPointHistory = this.categoryPointHistory.create({
        category: {
          id: categoryId,
        },
        buyer: {
          id: user.id,
        },
      });
      await queryRunner.manager.save(newCategoryPointHistory);
      const result = await this.pointTransactionService.createPointTransaction(
        user,
        {
          point,
          type,
          description,
        },
        queryRunner,
      );
      if (!result.ok) {
        return { ok: false, error: result.error };
      }
      await queryRunner.manager.update(
        CategoryPointHistory,
        { id: newCategoryPointHistory.id },
        {
          pointTransaction: {
            id: result.pointTransaction.id,
          },
        },
      );
      if (!queryRunnerOfParent) {
        await queryRunner.commitTransaction();
      }
    } catch {
      await queryRunner.rollbackTransaction();
      return { ok: false, error: 'Cannot create category point history' };
    } finally {
      if (!queryRunnerOfParent) {
        await queryRunner.release();
      }
    }
    return { ok: true };
  }
}
