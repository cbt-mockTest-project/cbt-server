import { User, UserRole } from 'src/users/entities/user.entity';
import {
  CreateMockExamCategoryInput,
  CreateMockExamCategoryOutput,
} from './dtos/createCategory.dto';
import {
  MockExamCategory,
  MockExamCategoryTypes,
} from './entities/mock-exam-category.entity';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, IsNull, Repository } from 'typeorm';
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
import { ReadMyMockExamCategoriesInput } from './dtos/readMyMockExamCategories.dto';
import {
  ReadMockExamCategoryByExamIdInput,
  ReadMockExamCategoryByExamIdOutput,
} from './dtos/readMockExamCategoryByExamId.dto';
import {
  ReadMockExamCategoriesInput,
  ReadMockExamCategoriesOutput,
} from './dtos/readMockExamCategories.dto';
import { ExamSource } from './entities/mock-exam.entity';
import { ReadMockExamCategoryIdsOutput } from './dtos/readMockExamCategoryIds.dto';
import {
  ReadMockExamCategoryByCategoryIdInput,
  ReadMockExamCategoryByCategoryIdOutput,
} from './dtos/readMockExamCategoryByCategoryId.dto';
import {
  SearchMockExamCategoriesInput,
  SearchMockExamCategoriesOutput,
} from './dtos/searchMockExamCategories.dto';
import {
  GetExamCategoriesInput,
  GetExamCategoriesOutput,
} from './dtos/getExamCategories.dto';
import { MockExamBookmark } from 'src/mock-exam-bookmark/entities/mock-exam-bookmark.entity';

@Injectable()
export class MockExamCategoryService {
  constructor(
    @InjectRepository(MockExamCategory)
    private readonly mockExamCategories: Repository<MockExamCategory>,
    @InjectRepository(MockExamBookmark)
    private readonly mockExamBookmarks: Repository<MockExamBookmark>,
  ) {}

  async getExamCategories(
    user: User,
    getExamCategoriesInput: GetExamCategoriesInput,
  ): Promise<GetExamCategoriesOutput> {
    const { examSource } = getExamCategoriesInput;
    const where: FindOptionsWhere<MockExamCategory>[] = [
      {
        source: examSource,
        isPublic: true,
      },
    ];
    if (user) {
      where.push({
        source: examSource,
        isPublic: false,
        user: {
          id: user.id,
        },
      });
    }
    const categories = await this.mockExamCategories.find({
      where,
      relations: {
        user: true,
      },
      order: {
        created_at: 'DESC',
      },
    });
    return {
      ok: true,
      categories,
    };
  }

  async createMockExamCategory(
    user: User,
    createMockExamCategoryInput: CreateMockExamCategoryInput,
  ): Promise<CreateMockExamCategoryOutput> {
    try {
      const { name, isPublic, description } = createMockExamCategoryInput;
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
        approved: false,
        isPublic,
        description,
        source:
          user.role === UserRole.ADMIN ? ExamSource.MOUD_CBT : ExamSource.USER,
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
    user: User,
    deleteMockExamCategoryInput: DeleteMockExamCategoryInput,
  ): Promise<DeleteMockExamCategoryOutput> {
    try {
      const { id } = deleteMockExamCategoryInput;
      const category = await this.mockExamCategories.findOne({
        where: { id },
        relations: { user: true },
      });
      if (!category) {
        return {
          ok: false,
          error: '카테고리가 존재하지 않습니다.',
        };
      }
      if (category.approved) {
        return {
          ok: false,
          error: '승인된 카테고리는 삭제할 수 없습니다.',
        };
      }
      if (user.id !== category.user.id) {
        return {
          ok: false,
          error: '권한이 없습니다.',
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
    user: User,
    editMockExamCategoryInput: EditMockExamCategoryInput,
  ): Promise<EditMockExamCategoryOutput> {
    const { id } = editMockExamCategoryInput;
    const prevCategory = await this.mockExamCategories.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!prevCategory) {
      return {
        ok: false,
        error: '존재하지 않는 카테고리입니다.',
      };
    }
    if (user.id !== prevCategory.user.id) {
      return {
        ok: false,
        error: '권한이 없습니다.',
      };
    }
    await this.mockExamCategories.save([editMockExamCategoryInput]);
    return {
      ok: true,
    };
  }

  async readAllMockExamCategories(
    readAllMockExamCategoriesInput: ReadAllMockExamCategoriesInput = {
      source: ExamSource.MOUD_CBT,
      type: MockExamCategoryTypes.practical,
      partnerId: null,
    },
  ): Promise<ReadAllMockExamCategoriesOutput> {
    try {
      const { type, source, partnerId } = readAllMockExamCategoriesInput;
      const where: FindOptionsWhere<MockExamCategory> = {
        type,
        approved: true,
        partner: IsNull(),
        source,
      };
      if (readAllMockExamCategoriesInput?.partnerId) {
        where.partner = {
          id: partnerId,
        };
      }
      const categories = await this.mockExamCategories.find({
        where,
        relations: {
          user: true,
          roles: true,
          partner: true,
        },
        order: {
          order: 'ASC',
        },
      });

      return {
        ok: true,
        categories,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: '카테고리를 찾을 수 없습니다.',
      };
    }
  }

  async readMockExamCategoryByExamId(
    readMockExamCategoryByExamIdInput: ReadMockExamCategoryByExamIdInput,
  ): Promise<ReadMockExamCategoryByExamIdOutput> {
    try {
      const { examId } = readMockExamCategoryByExamIdInput;
      const category = await this.mockExamCategories.findOne({
        where: {
          mockExam: {
            id: examId,
          },
        },
      });
      return {
        ok: true,
        category,
      };
    } catch {
      return {
        ok: false,
        error: '카테고리를 찾을 수 없습니다.',
      };
    }
  }

  async readMockExamCategoryByCategoryId(
    user: User,
    readMockExamCategoryByCategoryIdInput: ReadMockExamCategoryByCategoryIdInput,
  ): Promise<ReadMockExamCategoryByCategoryIdOutput> {
    try {
      const { id } = readMockExamCategoryByCategoryIdInput;
      const category = await this.mockExamCategories.findOne({
        where: {
          id,
        },
        relations: {
          user: true,
          mockExam: {
            user: true,
          },
        },
        order: {
          mockExam: {
            order: 'ASC',
            title: 'DESC',
          },
        },
      });
      // 로그인 상태일 경우, 북마크 여부를 조회한다.
      if (user) {
        const mockExamIds = category.mockExam.map((exam) => exam.id);
        const mockExamBookmarks = await this.mockExamBookmarks.find({
          where: {
            user: {
              id: user.id,
            },

            exam: In(mockExamIds),
          },
          relations: {
            exam: true,
          },
        });
        category.mockExam = category.mockExam.map((exam) => {
          const bookmark = mockExamBookmarks.find(
            (mockExamBookmark) => mockExamBookmark.exam.id === exam.id,
          );
          if (bookmark) {
            return {
              ...exam,
              isBookmarked: true,
            };
          }
          return {
            ...exam,
            isBookmarked: false,
          };
        });
      }
      return {
        ok: true,
        category,
      };
    } catch (e) {
      return {
        ok: false,
        error: '카테고리를 찾을 수 없습니다.',
      };
    }
  }

  async readMyMockExamCategories(
    user: User,
    readMyMockExamCategoriesInput?: ReadMyMockExamCategoriesInput,
  ) {
    try {
      const { type } = readMyMockExamCategoriesInput;
      if (!user) {
        return {
          ok: true,
          categories: [],
        };
      }
      let categories: MockExamCategory[] = [];
      if (user.role === UserRole.ADMIN) {
        categories = await this.mockExamCategories
          .createQueryBuilder('mockExamCategory')
          .getMany();
      } else {
        const queryBuilder = this.mockExamCategories
          .createQueryBuilder('mockExamCategory')
          .leftJoinAndSelect('mockExamCategory.examCoAuthor', 'examCoAuthor')
          .leftJoinAndSelect('mockExamCategory.examViewer', 'examViewer')
          .orWhere('mockExamCategory.user.id = :userId', { userId: user.id })
          .orWhere('examCoAuthor.user.id = :examCoAuthorId', {
            examCoAuthorId: user.id,
          });

        if (type !== 'author') {
          queryBuilder.orWhere(
            'examViewer.user.id = :examViewerId AND examViewer.isApprove = :isApprove',
            {
              examViewerId: user.id,
              isApprove: true,
            },
          );
        }
        categories = await queryBuilder.getMany();
      }
      return {
        ok: true,
        categories,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: '카테고리를 찾을 수 없습니다.',
      };
    }
  }

  async readMockExamCategories(
    readMockExamCategoriesInput?: ReadMockExamCategoriesInput,
  ): Promise<ReadMockExamCategoriesOutput> {
    const { source } = readMockExamCategoriesInput;
    const categories = await this.mockExamCategories.find({
      where: {
        source,
      },
    });
    try {
      return {
        ok: true,
        categories,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: '카테고리를 찾을 수 없습니다.',
      };
    }
  }

  async readMockExamCategoryIds(): Promise<ReadMockExamCategoryIdsOutput> {
    try {
      const categories = await this.mockExamCategories.find({
        select: ['id'],
      });
      const ids = categories.map((category) => category.id);
      return {
        ok: true,
        ids,
      };
    } catch {
      return {
        ok: false,
        error: '카테고리를 찾을 수 없습니다.',
      };
    }
  }

  async searchMockExamCategories(
    searchMockExamCategoriesInput: SearchMockExamCategoriesInput,
  ): Promise<SearchMockExamCategoriesOutput> {
    try {
      const { keyword, limit, page, isPublic } = searchMockExamCategoriesInput;
      const skip = (Number(page) - 1) * Number(limit);
      const formattedKeyword = `%${keyword.replace(/\s+/g, '').toLowerCase()}%`;
      const query = this.mockExamCategories
        .createQueryBuilder('category')
        .leftJoinAndSelect('category.user', 'user')
        .where(
          "(LOWER(REPLACE(category.name, ' ', '')) LIKE :formattedKeyword OR LOWER(REPLACE(user.nickname, ' ', '')) LIKE :formattedKeyword) AND category.isPublic = :isPublic",
          { formattedKeyword, isPublic: isPublic },
        );

      const totalCount = await query.getCount();

      const categories = await query.skip(skip).take(limit).getMany();

      return {
        totalCount,
        categories,
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '문제를 찾을 수 없습니다.',
      };
    }
  }
}
