import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEvaluation } from './entities/category-evaluation.entity';
import {
  CreateCategoryEvaluationInput,
  CreateCategoryEvaluationOutput,
} from './dtos/createCategoryEvaluation.dto';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import {
  UpdateCategoryEvaluationInput,
  UpdateCategoryEvaluationOutput,
} from './dtos/updateCategoryEvaluation.dto';
import {
  DeleteCategoryEvaluationInput,
  DeleteCategoryEvaluationOutput,
} from './dtos/deleteCategoryEvaluation.dto';
import {
  GetCategoryEvaluationInput,
  GetCategoryEvaluationOutput,
} from './dtos/getCategoryEvaluation.dto';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';
import {
  CheckIfCategoryEvaluatedInput,
  CheckIfCategoryEvaluatedOutput,
} from './dtos/checkIfCategoryEvaluated.dto';

@Injectable()
export class CategoryEvaluationService {
  constructor(
    @InjectRepository(CategoryEvaluation)
    private readonly categoryEvaluation: Repository<CategoryEvaluation>,
    @InjectRepository(MockExamCategory)
    private readonly mockExamCategory: Repository<MockExamCategory>,
  ) {}

  async createCategoryEvaluation(
    user: User,
    createCategoryEvaluationInput: CreateCategoryEvaluationInput,
  ): Promise<CreateCategoryEvaluationOutput> {
    try {
      const { categoryId, isSecret, score, feedback } =
        createCategoryEvaluationInput;

      const existCategoryEvaluation = await this.categoryEvaluation.findOne({
        where: {
          user: {
            id: user.id,
          },
          category: {
            id: categoryId,
          },
        },
      });
      if (existCategoryEvaluation) {
        return {
          ok: false,
          error: '이미 평가한 암기장입니다.',
        };
      }

      const category = await this.mockExamCategory.findOne({
        where: {
          id: categoryId,
        },
      });
      if (!category) {
        return {
          ok: false,
          error: '존재하지 않는 암기장입니다.',
        };
      }
      const newCategoryEvaluation = this.categoryEvaluation.create({
        score,
        feedback,
        isSecret,
        category,
        user,
      });
      const categoryEvaluation = await this.categoryEvaluation.save(
        newCategoryEvaluation,
      );
      return {
        ok: true,
        categoryEvaluation,
      };
    } catch (error) {
      return {
        ok: false,
        error: '암기장 평가를 생성할 수 없습니다.',
      };
    }
  }

  async updateCategoryEvaluation(
    user: User,
    updateCategoryEvaluationInput: UpdateCategoryEvaluationInput,
  ): Promise<UpdateCategoryEvaluationOutput> {
    try {
      const { id, score, feedback, isSecret } = updateCategoryEvaluationInput;
      const categoryEvaluation = await this.categoryEvaluation.findOne({
        where: {
          id,
          user: {
            id: user.id,
          },
        },
      });
      if (!categoryEvaluation) {
        return {
          ok: false,
          error: '존재하지 않는 암기장 평가입니다.',
        };
      }
      if (score) {
        categoryEvaluation.score = score;
      }
      if (feedback) {
        categoryEvaluation.feedback = feedback;
      }
      if (isSecret) {
        categoryEvaluation.isSecret = isSecret;
      }
      await this.categoryEvaluation.save(categoryEvaluation);

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: '암기장 평가를 수정할 수 없습니다.',
      };
    }
  }

  async deleteCategoryEvaluation(
    user: User,
    deleteCategoryEvaluationInput: DeleteCategoryEvaluationInput,
  ): Promise<DeleteCategoryEvaluationOutput> {
    try {
      const { id } = deleteCategoryEvaluationInput;
      const categoryEvaluation = await this.categoryEvaluation.findOne({
        where: {
          id,
          user: {
            id: user.id,
          },
        },
      });
      if (!categoryEvaluation) {
        return {
          ok: false,
          error: '존재하지 않는 암기장 평가입니다.',
        };
      }
      await this.categoryEvaluation.delete({
        id,
      });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: '암기장 평가를 삭제할 수 없습니다.',
      };
    }
  }

  async getCategoryEvaluation(
    user: User,
    getCategoryEvaluationInput: GetCategoryEvaluationInput,
  ): Promise<GetCategoryEvaluationOutput> {
    const { categoryId } = getCategoryEvaluationInput;
    try {
      let isEvaluated = false;
      const categoryEvaluations = await this.categoryEvaluation.find({
        where: {
          category: {
            id: categoryId,
          },
        },
        relations: {
          user: true,
        },
      });
      if (user) {
        const existCategoryEvaluation = categoryEvaluations.find(
          (categoryEvaluation) => categoryEvaluation.user.id === user.id,
        );
        if (existCategoryEvaluation) {
          isEvaluated = true;
        }
      }
      return {
        ok: true,
        categoryEvaluations,
        isEvaluated,
      };
    } catch (error) {
      return {
        ok: false,
        error: '암기장 평가를 불러올 수 없습니다.',
      };
    }
  }

  async checkIfCategoryEvaluated(
    user: User,
    checkIfCategoryEvaluatedInput: CheckIfCategoryEvaluatedInput,
  ): Promise<CheckIfCategoryEvaluatedOutput> {
    try {
      const { categoryId } = checkIfCategoryEvaluatedInput;
      const existCategoryEvaluation = await this.categoryEvaluation.findOne({
        where: {
          user: {
            id: user.id,
          },
          category: {
            id: categoryId,
          },
        },
      });
      if (!existCategoryEvaluation) {
        return {
          ok: true,
          isEvaluated: false,
        };
      }
      return {
        ok: true,
        isEvaluated: true,
      };
    } catch {
      return {
        ok: false,
        error: '암기장 평가를 불러올 수 없습니다.',
      };
    }
  }
}
