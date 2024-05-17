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
import {
  GetCategoryPointHistoriesInput,
  GetCategoryPointHistoriesOutput,
} from './dtos/category-point-history/get-category-point-histories.dto';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';

@Injectable()
export class CategoryPointHistoryService {
  constructor(
    @InjectRepository(CategoryPointHistory)
    private readonly categoryPointHistory: Repository<CategoryPointHistory>,
    @InjectRepository(MockExamCategory)
    private readonly category: Repository<MockExamCategory>,
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
      const category = await this.category.findOne({
        where: {
          id: categoryId,
        },
        relations: {
          user: true,
        },
      });
      if (!category) {
        await queryRunner.rollbackTransaction();
        return { ok: false, error: 'Category not found' };
      }
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
        category.user,
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

  async getCategoryPointHistories(
    user: User,
    getCategoryPointHistoriesInput: GetCategoryPointHistoriesInput,
  ): Promise<GetCategoryPointHistoriesOutput> {
    const { categoryId } = getCategoryPointHistoriesInput;
    try {
      const category = await this.category.findOne({
        where: {
          id: categoryId,
          user: {
            id: user.id,
          },
        },
      });
      if (!category) {
        return { ok: false, error: 'Category not found' };
      }
      const categoryPointHistories = await this.categoryPointHistory.find({
        where: {
          category: {
            id: categoryId,
          },
        },
        relations: {
          pointTransaction: true,
          buyer: true,
        },
        order: {
          created_at: 'DESC',
        },
      });
      categoryPointHistories;
      return { ok: true, categoryPointHistories };
    } catch {
      return { ok: false, error: 'Cannot get category point histories' };
    }
  }
}
