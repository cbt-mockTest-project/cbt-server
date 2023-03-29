import {
  DeleteQuestionCardCategoryInput,
  DeleteQuestionCardCategoryOutput,
} from './dtos/DeleteQuestionCardCategory.dto';
import { User } from './../users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionCardCategory } from './entities/question-card-category';
import { ReadMyQuestionCardCategoriesOutput } from './dtos/readMyQuestionCardCategories.dto';
import {
  CreateQuestionCardCategoryInput,
  CreateQuestionCardCategoryOutput,
} from './dtos/createQuestionCardCategory.dto';
import {
  UpdateQuestionCardCategoryInput,
  UpdateQuestionCardCategoryOutput,
} from './dtos/updateQuestionCardCategory.dto';

@Injectable()
export class QuestionCardCategoryService {
  constructor(
    @InjectRepository(QuestionCardCategory)
    private readonly questionCardCategory: Repository<QuestionCardCategory>,
  ) {}

  async readMyQuestionCardCategories(
    user: User,
  ): Promise<ReadMyQuestionCardCategoriesOutput> {
    try {
      const categories = await this.questionCardCategory.find({
        where: {
          user: { id: user.id },
        },
        order: {
          created_at: 'DESC',
        },
      });
      if (categories.length === 0) {
        const newCategory = this.questionCardCategory.create({
          name: '기본',
          user,
        });
        await this.questionCardCategory.save(newCategory);
        return {
          ok: true,
          categories: [newCategory],
        };
      }
      return {
        ok: true,
        categories,
      };
    } catch {
      return {
        ok: false,
        error: '데이터를 불러오지 못했습니다.',
      };
    }
  }

  async createQuestionCardCategory(
    createQuestionCardCategoryInput: CreateQuestionCardCategoryInput,
    user: User,
  ): Promise<CreateQuestionCardCategoryOutput> {
    try {
      const newCategory = this.questionCardCategory.create(
        createQuestionCardCategoryInput,
      );
      newCategory.user = user;
      const category = await this.questionCardCategory.save(newCategory);
      return {
        ok: true,
        category,
      };
    } catch {
      return {
        ok: false,
        error: '카테고리 생성에 실패했습니다.',
      };
    }
  }

  async deleteQuestionCardCategory(
    user: User,
    deleteQuestionCardCategoryInput: DeleteQuestionCardCategoryInput,
  ): Promise<DeleteQuestionCardCategoryOutput> {
    try {
      const { id } = deleteQuestionCardCategoryInput;
      const category = await this.questionCardCategory.findOne({
        relations: { user: true, questionCard: true },
        where: {
          id,
          user: {
            id: user.id,
          },
        },
      });
      if (!category) {
        return {
          ok: false,
          error: '카테고리가 존재하지 않습니다.',
        };
      }
      if (category.questionCard.length > 0) {
        return {
          ok: false,
          error: '카테고리에 속한 메모를 모두 삭제후 삭제해주세요.',
        };
      }
      await this.questionCardCategory.delete({ id });
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '카테고리 삭제에 실패했습니다.',
      };
    }
  }

  async updateQuestionCardCategory(
    user: User,
    updateQuestionCardCategoryInput: UpdateQuestionCardCategoryInput,
  ): Promise<UpdateQuestionCardCategoryOutput> {
    try {
      const { id, name } = updateQuestionCardCategoryInput;
      let category = await this.questionCardCategory.findOne({
        relations: { user: true },
        where: {
          id,
          user: {
            id: user.id,
          },
        },
      });
      if (!category) {
        return {
          ok: false,
          error: '카테고리가 존재하지 않습니다.',
        };
      }
      category.name = name;
      category = await this.questionCardCategory.save(category);
      return {
        ok: true,
        category,
      };
    } catch {
      return {
        ok: false,
        error: '카테고리 수정에 실패했습니다.',
      };
    }
  }
}
