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
import {
  FindManyOptions,
  FindOptionsWhere,
  In,
  IsNull,
  Like,
  Repository,
} from 'typeorm';
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
import { ReadMockExamCategoryIdsOutput } from './dtos/readMockExamCategoryIds.dto';
import {
  ReadMockExamCategoryByCategoryIdInput,
  ReadMockExamCategoryByCategoryIdOutput,
} from './dtos/readMockExamCategoryByCategoryId.dto';
import {
  SearchMockExamCategoriesInput,
  SearchMockExamCategoriesOutput,
} from '../exam/dtos/searchMockExamCategories.dto';
import {
  GetExamCategoriesInput,
  GetExamCategoriesOutput,
} from '../exam/dtos/getExamCategories.dto';
import { MockExamBookmark } from 'src/exam-bookmark/entities/mock-exam-bookmark.entity';
import { GetMyExamCategoriesOutput } from '../exam/dtos/getMyExamCategories.dto';
import { ExamLike } from 'src/exam-like/entities/exam-like.entity';
import { ExamCategoryBookmark } from 'src/exam-category-bookmark/entities/exam-category-bookmark';
import { ExamSource } from 'src/enums/enum';
import { ExamCategoryBookmarkService } from 'src/exam-category-bookmark/exam-category-bookmark.service';
import {
  GetExamCategoryLearningProgressInput,
  GetExamCategoryLearningProgressOutput,
} from './dtos/getExamCategoryLearningProgress.dto';
import {
  MockExamQuestionState,
  QuestionState,
} from 'src/exam/entities/mock-exam-question-state.entity';
import { ReadMockExamCategoryNamesOutput } from './dtos/readMockExamCategoryNames.dto';
import { GetMyAllExamCategoriesLearningProgressOutput } from './dtos/getMyAllExamCategoriesLearningProgress.dto';

@Injectable()
export class MockExamCategoryService {
  constructor(
    @InjectRepository(MockExamCategory)
    private readonly mockExamCategories: Repository<MockExamCategory>,
    @InjectRepository(MockExamBookmark)
    private readonly mockExamBookmarks: Repository<MockExamBookmark>,
    @InjectRepository(ExamLike)
    private readonly examLikes: Repository<ExamLike>,
    @InjectRepository(ExamCategoryBookmark)
    private readonly examCategoryBookmarks: Repository<ExamCategoryBookmark>,
    @InjectRepository(MockExamQuestionState)
    private readonly mockExamQuestionStates: Repository<MockExamQuestionState>,
    private readonly examCategoryBookmarkService: ExamCategoryBookmarkService,
  ) {}

  async getMyAllExamCategoriesLearningProgress(
    user: User,
  ): Promise<GetMyAllExamCategoriesLearningProgressOutput> {
    try {
      const categories = await this.mockExamCategories.find({
        relations: {
          mockExam: {
            mockExamQuestion: true,
          },
        },
      });
      const mockExamIds = categories.reduce((acc, category) => {
        const ids = category.mockExam.map((exam) => exam.id);
        return [...acc, ...ids];
      }, []);
      const mockExamQuestionStates = await this.mockExamQuestionStates.find({
        where: {
          user: {
            id: user.id,
          },
          exam: In(mockExamIds),
        },
      });

      const totalQuestionCount = categories.reduce(
        (acc, category) =>
          acc +
          category.mockExam.reduce(
            (acc, exam) => acc + exam.mockExamQuestion.length,
            0,
          ),
        0,
      );
      const highScoreCount = mockExamQuestionStates.filter(
        (state) => state.state === QuestionState.HIGH,
      ).length;
      const lowScoreCount = mockExamQuestionStates.filter(
        (state) => state.state === QuestionState.ROW,
      ).length;

      return {
        ok: true,
        totalQuestionCount,
        highScoreCount,
        lowScoreCount,
      };
    } catch {
      return {
        ok: false,
        error: '카테고리를 찾을 수 없습니다.',
      };
    }
  }

  async getExamCategoryLearningProgress(
    user: User,
    getExamCategoryLearningProgressInput: GetExamCategoryLearningProgressInput,
  ): Promise<GetExamCategoryLearningProgressOutput> {
    try {
      const { categoryId } = getExamCategoryLearningProgressInput;
      const category = await this.mockExamCategories.findOne({
        where: {
          id: categoryId,
        },
        relations: {
          mockExam: {
            mockExamQuestion: true,
          },
        },
      });
      if (!category) {
        return {
          ok: false,
          error: '카테고리를 찾을 수 없습니다.',
        };
      }

      const mockExamIds = category.mockExam.map((exam) => exam.id);
      const mockExamQuestionStates = await this.mockExamQuestionStates.find({
        where: {
          user: {
            id: user.id,
          },
          exam: In(mockExamIds),
        },
      });

      const totalQuestionCount = category.mockExam.reduce(
        (acc, exam) => acc + exam.mockExamQuestion.length,
        0,
      );
      const highScoreCount = mockExamQuestionStates.filter(
        (state) => state.state === QuestionState.HIGH,
      ).length;
      const lowScoreCount = mockExamQuestionStates.filter(
        (state) => state.state === QuestionState.ROW,
      ).length;

      return {
        ok: true,
        totalQuestionCount,
        highScoreCount,
        lowScoreCount,
      };
    } catch {
      return {
        ok: false,
        error: '카테고리를 찾을 수 없습니다.',
      };
    }
  }

  async getExamCategories(
    getExamCategoriesInput: GetExamCategoriesInput,
    user?: User,
  ): Promise<GetExamCategoriesOutput> {
    const {
      examSource,
      categoryMakerId,
      isBookmarked,
      limit,
      isPublicOnly,
      page,
      keyword,
    } = getExamCategoriesInput;
    if (isBookmarked) {
      if (!user)
        return {
          ok: false,
          error: '로그인이 필요합니다.',
        };
      return this.examCategoryBookmarkService.getMyBookmarkedExamCategories(
        user,
      );
    }

    if (!isBookmarked) {
      const where:
        | FindOptionsWhere<MockExamCategory>
        | FindOptionsWhere<MockExamCategory>[] = [];
      if (examSource) {
        where.push({
          source: examSource,
          isPublic: true,
        });
        if (!isPublicOnly && user) {
          where.push({
            source: examSource,
            isPublic: false,
            user: {
              id: user.id,
            },
          });
        }
      }

      if (categoryMakerId) {
        where.push({
          user: {
            id: categoryMakerId,
          },
          isPublic: true,
        });
        if (!isPublicOnly && user?.id === categoryMakerId) {
          where.push({
            user: {
              id: categoryMakerId,
            },
            isPublic: false,
          });
        }
      }

      const categoryFindOption: FindManyOptions<MockExamCategory> = {
        where,
        relations: {
          user: true,
          mockExam: true,
        },
        order: {
          order: 'ASC',
          created_at: 'DESC',
        },
      };
      if (limit) categoryFindOption.take = limit;
      if (page) categoryFindOption.skip = (Number(page) - 1) * Number(limit);
      if (keyword) {
        categoryFindOption.where = {
          ...categoryFindOption.where,
          isPublic: true,
          name: Like(`%${keyword}%`),
        };
      }
      let categories = await this.mockExamCategories.find(categoryFindOption);
      if (user) {
        const categoryIds = categories.map((category) => category.id);
        const categoryBookmarks = await this.examCategoryBookmarks.find({
          relations: {
            category: true,
          },
          where: {
            user: {
              id: user.id,
            },
            category: In(categoryIds),
          },
        });
        categories = categories.map((category) => {
          const isBookmarked = categoryBookmarks.find(
            (bookmark) => bookmark.category.id === category.id,
          );
          if (isBookmarked) category.isBookmarked = true;
          return category;
        });
      }
      return {
        ok: true,
        categories,
      };
    }
  }

  async getMyExamCategories(user: User): Promise<GetMyExamCategoriesOutput> {
    try {
      const categories = await this.mockExamCategories.find({
        where: {
          user: {
            id: user.id,
          },
        },
        relations: {
          user: true,
        },
        order: {
          order: 'ASC',
          created_at: 'DESC',
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
      const { id, name } = readMockExamCategoryByCategoryIdInput;
      const category = await this.mockExamCategories.findOne({
        where: {
          ...(id ? { id } : {}),
          ...(name ? { name } : {}),
        },
        relations: {
          user: true,
          mockExam: {
            user: true,
            mockExamQuestion: true,
          },
        },
        order: {
          mockExam: {
            order: 'ASC',
            title: 'DESC',
          },
        },
      });
      if (category.isPublic) category.hasAccess = true;

      // 로그인 상태일 경우,
      if (user) {
        // 접근 권한체크
        const isBookmarkedCategory = await this.examCategoryBookmarks.findOne({
          where: {
            user: {
              id: user.id,
            },
            category: {
              id,
            },
          },
        });
        if (isBookmarkedCategory) category.isBookmarked = true;
        if (isBookmarkedCategory || category.user.id === user.id) {
          category.hasAccess = true;
        }

        const mockExamIds = category.mockExam.map((exam) => exam.id);
        const findOption = {
          where: {
            user: {
              id: user.id,
            },
            exam: In(mockExamIds),
          },
          relations: {
            exam: true,
          },
        };

        // 북마크 여부, 좋아요 여부를 조회한다.
        const [mockExamBookmarks, examLikes] = await Promise.all([
          this.mockExamBookmarks.find(findOption).then((res) => res),
          this.examLikes.find(findOption).then((res) => res),
        ]);

        category.mockExam = category.mockExam.map((exam) => {
          const bookmark = mockExamBookmarks.find(
            (mockExamBookmark) => mockExamBookmark.exam.id === exam.id,
          );
          const like = examLikes.find(
            (examLike) => examLike.exam.id === exam.id,
          );
          const newExam = { ...exam };
          if (like) newExam.isLiked = true;
          if (bookmark) newExam.isBookmarked = true;
          return newExam;
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
    try {
      const { source } = readMockExamCategoriesInput;
      const categories = await this.mockExamCategories.find({
        where: {
          source,
        },
        order: {
          order: 'ASC',
          created_at: 'DESC',
        },
      });
      return {
        ok: true,
        categories,
      };
    } catch (e) {
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

  async readMockExamCategoryNames(): Promise<ReadMockExamCategoryNamesOutput> {
    try {
      const categories = await this.mockExamCategories.find({
        select: ['name'],
      });
      const names = categories.map((category) => category.name);
      return {
        ok: true,
        names,
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
