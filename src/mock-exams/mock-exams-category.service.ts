import {
  CreateMockExamCategoryInput,
  CreateMockExamCategoryOutput,
} from './dtos/createCategory.dto';
import { MockExamCategory } from './entities/mock-exam-category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  DeleteMockExamCategoryInput,
  DeleteMockExamCategoryOutput,
} from './dtos/deleteCategory.dto';
import {
  EditMockExamCategoryInput,
  EditMockExamCategoryOutput,
} from './dtos/editCategory.dto';

@Injectable()
export class MockExamCategoryService {
  constructor(
    @InjectRepository(MockExamCategory)
    private readonly mockExamCategories: Repository<MockExamCategory>,
  ) {}

  async createMockExamCategory(
    createMockExamCategoryInput: CreateMockExamCategoryInput,
  ): Promise<CreateMockExamCategoryOutput> {
    try {
      const { name } = createMockExamCategoryInput;
      const exists = await this.mockExamCategories.findOne({
        where: { name },
      });
      if (exists) {
        return {
          ok: false,
          error: '이미 존재하는 카테고리 입니다.',
        };
      }
      const newCategory = this.mockExamCategories.create(
        createMockExamCategoryInput,
      );
      await this.mockExamCategories.save(newCategory);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '카테고리를 생성할 수 없습니다.',
      };
    }
  }

  async deleteMockExamCategory(
    deleteMockExamCategoryInput: DeleteMockExamCategoryInput,
  ): Promise<DeleteMockExamCategoryOutput> {
    try {
      const { id } = deleteMockExamCategoryInput;
      const category = await this.mockExamCategories.findOne({
        where: { id },
      });
      if (!category) {
        return {
          ok: false,
          error: '카테고리가 존재하지 않습니다.',
        };
      }
      await this.mockExamCategories.delete({
        id,
      });
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '카테고리를 삭제할 수 없습니다.',
      };
    }
  }

  async editMockExamCategory(
    editMockExamCategoryInput: EditMockExamCategoryInput,
  ): Promise<EditMockExamCategoryOutput> {
    const { id, name } = editMockExamCategoryInput;
    const prevCategory = await this.mockExamCategories.findOne({
      where: { id },
    });
    if (!prevCategory) {
      return {
        ok: false,
        error: '존재하지 않는 카테고리입니다.',
      };
    }
    if (prevCategory.name === name) {
      return {
        ok: false,
        error: '현재와 동일한 카테고리 이름입니다.',
      };
    }
    await this.mockExamCategories.save([editMockExamCategoryInput]);
    return {
      ok: true,
    };
  }
}
