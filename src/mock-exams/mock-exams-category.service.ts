import { User, UserRole } from 'src/users/entities/user.entity';
import {
  CreateMockExamCategoryInput,
  CreateMockExamCategoryOutput,
} from './dtos/createCategory.dto';
import {
  MockExamCategory,
  MockExamCategoryTypes,
} from './entities/mock-exam-category.entity';
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
import {
  ReadAllMockExamCategoriesInput,
  ReadAllMockExamCategoriesOutput,
} from './dtos/readAllCategories.dto';

@Injectable()
export class MockExamCategoryService {
  constructor(
    @InjectRepository(MockExamCategory)
    private readonly mockExamCategories: Repository<MockExamCategory>,
  ) {}

  async createMockExamCategory(
    user: User,
    createMockExamCategoryInput: CreateMockExamCategoryInput,
  ): Promise<CreateMockExamCategoryOutput> {
    try {
      const { name } = createMockExamCategoryInput;
      const approved = user.role === UserRole.ADMIN ? true : false;
      const exists = await this.mockExamCategories.findOne({
        where: { name },
      });
      if (exists) {
        return {
          ok: false,
          error: '이미 존재하는 카테고리 입니다.',
        };
      }
      const newCategory = this.mockExamCategories.create({
        name: createMockExamCategoryInput.name,
        user,
        approved,
      });
      const category = await this.mockExamCategories.save(newCategory);
      return {
        ok: true,
        category,
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

  async readAllMockExamCategories(
    readAllMockExamCategoriesInput: ReadAllMockExamCategoriesInput,
  ): Promise<ReadAllMockExamCategoriesOutput> {
    // default는 실기값
    try {
      let type = MockExamCategoryTypes.practical;
      if (readAllMockExamCategoriesInput) {
        type = readAllMockExamCategoriesInput.type;
      }
      if (
        readAllMockExamCategoriesInput &&
        readAllMockExamCategoriesInput.all
      ) {
        const categories = await this.mockExamCategories.find();
        return {
          ok: true,
          categories,
        };
      }
      const categories = await this.mockExamCategories.find({
        where: {
          type,
          approved: true,
        },
      });
      return {
        ok: true,
        categories,
      };
    } catch {
      return {
        ok: false,
        error: '카테고리를 찾을 수 없습니다.',
      };
    }
  }

  async readMyMockExamCategories(user: User) {
    try {
      const categories = await this.mockExamCategories.find({
        where: {
          user: { id: user.id },
        },
      });
      return {
        ok: true,
        categories,
      };
    } catch {
      return {
        ok: false,
        error: '카테고리를 찾을 수 없습니다.',
      };
    }
  }
}
