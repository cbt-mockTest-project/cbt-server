import { User, UserRole } from 'src/users/entities/user.entity';
import {
  CreateMockExamCategoryInput,
  CreateMockExamCategoryOutput,
} from './dtos/createCategory.dto';
import {
  MockExamCategory,
  ExamType,
} from './entities/mock-exam-category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, IsNull, Not, Repository } from 'typeorm';
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
  GetExamCategoriesInputV2,
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
import { sortExams } from 'src/lib/utils/sortExams';
import {
  MoveExamOrderInput,
  MoveExamOrderOutput,
} from './dtos/moveExamOrder.dto';
import { RevalidateService } from 'src/revalidate/revalidate.service';
import { MockExamQuestion } from 'src/exam/entities/mock-exam-question.entity';
import { CategoryEvaluation } from 'src/category-evaluation/entities/category-evaluation.entity';
import {
  CheckIsAccessibleCategoryInput,
  CheckIsAccessibleCategoryOutput,
} from './dtos/checkIsAccessibleCategory.dto';
import { CheckHasCategoryAccessInput } from './dtos/checkHasCategoryAccess.dto';
import { MockExam } from 'src/exam/entities/mock-exam.entity';
import {
  GetCategoryNamesAndSlugsInput,
  GetCategoryNamesAndSlugsOutput,
} from './dtos/getCategoryNamesAndSlugs.dto';

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
    @InjectRepository(MockExamQuestion)
    private readonly mockExamQuestions: Repository<MockExamQuestion>,
    @InjectRepository(CategoryEvaluation)
    private readonly categoryEvaluations: Repository<CategoryEvaluation>,
    @InjectRepository(MockExam)
    private readonly mockExams: Repository<MockExam>,
    private readonly examCategoryBookmarkService: ExamCategoryBookmarkService,
    private readonly revalidateService: RevalidateService,
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
          mockExam: true,
        },
      });
      if (!category) {
        return {
          ok: false,
          error: '카테고리를 찾을 수 없습니다.',
        };
      }
      const mockExamIds = category.mockExam.map((exam) => exam.id);
      const [mockExamQuestionStates, totalQuestionCount] = await Promise.all([
        this.mockExamQuestionStates.find({
          where: {
            user: {
              id: user.id,
            },
            exam: In(mockExamIds),
          },
        }),
        this.mockExamQuestions.count({
          where: {
            mockExam: In(mockExamIds),
          },
        }),
      ]);

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
      isBookmarked,
      limit,
      page,
      categoryMakerId,
      isPick,
      keyword,
      isPublicOnly,
      sort,
      examType,
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
      const categoryQuery = this.mockExamCategories
        .createQueryBuilder('category')
        .leftJoinAndSelect('category.user', 'user')
        .leftJoinAndSelect('category.mockExam', 'mockExam');

      if (examSource) {
        categoryQuery.andWhere(
          'category.source = :source AND category.isPublic = :isPublic',
          {
            source: examSource,
            isPublic: true,
          },
        );
      }
      if (examType) {
        categoryQuery.andWhere('category.examType = :examType', {
          examType,
        });
      }
      if (isPick) {
        categoryQuery.andWhere('category.isPick = :isPick', {
          isPick: true,
        });
      }
      if (isPick === false) {
        categoryQuery.andWhere('category.isPick = :isPick', {
          isPick: false,
        });
      }
      // categoryMakerId가 있는 경우, 해당 유저가 만든 카테고리를 검색
      if (categoryMakerId) {
        categoryQuery.andWhere('user.id = :categoryMakerId', {
          categoryMakerId,
        });
        if (!user || user.id !== categoryMakerId) {
          categoryQuery.andWhere('category.isPublic = :isPublic', {
            isPublic: true,
          });
        }
      }
      if (keyword) {
        const formattedKeyword = `%${keyword
          .replace(/\s+/g, '')
          .toLowerCase()}%`;
        categoryQuery.andWhere(
          "(LOWER(REPLACE(category.name, ' ', '')) LIKE :formattedKeyword OR LOWER(REPLACE(category.description, ' ', '')) LIKE :formattedKeyword)",
          { formattedKeyword },
        );
      }

      if (isPublicOnly) {
        categoryQuery.andWhere('category.isPublic = :isPublic', {
          isPublic: true,
        });
      }

      categoryQuery
        .orderBy('category.order', 'ASC')
        .addOrderBy('category.created_at', 'DESC');

      // categoryMakerId가 없는 경우, 시험지가 1개 이상 있는 카테고리만 검색
      if (!categoryMakerId) {
        categoryQuery.andWhere('mockExam.id IS NOT NULL');
      }
      if (limit) {
        categoryQuery.take(limit);
      }
      if (page) {
        categoryQuery.skip((Number(page) - 1) * Number(limit));
      }

      let categories = await categoryQuery.getMany();
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
      const categoryEvaluations = await this.categoryEvaluations.find({
        where: {
          category: In(categories.map((category) => category.id)),
        },
        relations: {
          category: true,
        },
      });
      categories = categories.map((category) => {
        const evaluation = categoryEvaluations.filter(
          (evaluation) => evaluation.category.id === category.id,
        );
        if (evaluation) category.categoryEvaluations = evaluation;
        return category;
      });
      if (sort === 'likeCount') {
        categories = categories.sort(
          (a, b) => b.categoryEvaluations.length - a.categoryEvaluations.length,
        );
      }
      return {
        ok: true,
        categories,
      };
    }
  }

  async getExamCategoriesV2(
    getExamCategoriesInputV2: GetExamCategoriesInputV2,
    user?: User,
  ): Promise<GetExamCategoriesOutput> {
    const {
      examSources,
      isBookmarked,
      limit,
      page,
      categoryMakerId,
      isPick,
      keyword,
      isPublicOnly,
      examType,
    } = getExamCategoriesInputV2;
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
      const categoryQuery = this.mockExamCategories
        .createQueryBuilder('category')
        .leftJoinAndSelect('category.user', 'user')
        .andWhere('category.examType = :examType', {
          examType,
        })
        .orderBy({
          'category.evaluationCount': 'DESC',
          'category.created_at': 'DESC',
        });
      if (examSources.length > 0) {
        categoryQuery.andWhere(
          'category.source IN (:...sources) AND category.isPublic = :isPublic',
          {
            sources: examSources,
            isPublic: true,
          },
        );
      }
      if (isPick) {
        categoryQuery.andWhere('category.isPick = :isPick', {
          isPick: true,
        });
      }
      if (isPick === false) {
        categoryQuery.andWhere('category.isPick = :isPick', {
          isPick: false,
        });
      }
      // categoryMakerId가 있는 경우, 해당 유저가 만든 카테고리를 검색
      if (categoryMakerId) {
        categoryQuery.andWhere('user.id = :categoryMakerId', {
          categoryMakerId,
        });
        if (!user || user.id !== categoryMakerId) {
          categoryQuery.andWhere('category.isPublic = :isPublic', {
            isPublic: true,
          });
        }
      }

      if (keyword) {
        const formattedKeyword = `%${keyword
          .replace(/\s+/g, '')
          .toLowerCase()}%`;
        categoryQuery.andWhere(
          "(LOWER(REPLACE(category.name, ' ', '')) LIKE :formattedKeyword OR LOWER(REPLACE(category.description, ' ', '')) LIKE :formattedKeyword)",
          { formattedKeyword },
        );
      }

      if (isPublicOnly) {
        categoryQuery.andWhere('category.isPublic = :isPublic', {
          isPublic: true,
        });
      }

      if (limit) {
        categoryQuery.take(limit);
      }
      if (page) {
        categoryQuery.skip((Number(page) - 1) * Number(limit));
      }

      let categories = await categoryQuery.getMany();
      categories = await Promise.all(
        categories.map(async (category) => {
          const examCount = await this.mockExams.count({
            where: {
              mockExamCategory: {
                id: category.id,
              },
            },
          });
          category.examCount = examCount;
          return category;
        }),
      );
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
      const { name, isPublic, description, examType } =
        createMockExamCategoryInput;
      const exists = await this.mockExamCategories.findOne({
        where: [{ name }, { urlSlug: name }],
      });
      if (exists) {
        return {
          ok: false,
          error: '폴더 제목이 중복됩니다.',
        };
      }

      const newCategory = this.mockExamCategories.create({
        name: createMockExamCategoryInput.name,
        urlSlug: createMockExamCategoryInput.name,
        user,
        approved: false,
        isPublic,
        description,
        source:
          user.role === UserRole.ADMIN ? ExamSource.MOUD_CBT : ExamSource.USER,
        examType,
      });
      const category = await this.mockExamCategories.save(newCategory);
      return {
        ok: true,
        category,
      };
    } catch {
      return {
        ok: false,
        error: '폴더를 생성할 수 없습니다.',
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
    const { id, isPublic } = editMockExamCategoryInput;
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
    const duplicated = await this.mockExamCategories.findOne({
      where: [
        { name: editMockExamCategoryInput.name, id: Not(id) },
        { urlSlug: editMockExamCategoryInput.name, id: Not(id) },
      ],
    });
    if (duplicated) {
      return {
        ok: false,
        error: '폴더 제목이 중복됩니다.',
      };
    }
    if (user.id !== prevCategory.user.id) {
      return {
        ok: false,
        error: '권한이 없습니다.',
      };
    }
    const exams = await this.mockExams.find({
      where: {
        mockExamCategory: {
          id,
        },
        user: {
          id: user.id,
        },
      },
    });
    const examIds = exams.map((exam) => exam.id);
    if (examIds.length > 0) {
      if (isPublic) {
        await this.mockExams.update(examIds, { approved: true });
      }
      if (!isPublic) {
        await this.mockExams.update(examIds, { approved: false });
      }
    }
    await this.mockExamCategories.save({ ...editMockExamCategoryInput });
    this.revalidateService.revalidate({
      path:
        prevCategory.examType === ExamType.SUBJECTIVE
          ? `/category/${prevCategory.urlSlug}`
          : `/mcq/category/${prevCategory.urlSlug}`,
    });
    return {
      ok: true,
    };
  }

  async readAllMockExamCategories(
    readAllMockExamCategoriesInput: ReadAllMockExamCategoriesInput = {
      source: ExamSource.MOUD_CBT,
      examType: ExamType.SUBJECTIVE,
      partnerId: null,
    },
  ): Promise<ReadAllMockExamCategoriesOutput> {
    try {
      const { examType, source, partnerId } = readAllMockExamCategoriesInput;
      const where: FindOptionsWhere<MockExamCategory> = {
        examType,
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
      const { id, name, urlSlug, examType } =
        readMockExamCategoryByCategoryIdInput;
      const category = await this.mockExamCategories.findOne({
        where: {
          ...(id ? { id } : {}),
          ...(name ? { name } : {}),
          ...(urlSlug ? { urlSlug } : {}),
          ...(examType ? { examType } : {}),
        },
        relations: {
          user: true,
          revenueRequestForm: true,
          mockExam: {
            user: true,
            // mockExamQuestion: true,
          },
        },
      });
      const mockExamIds = category.mockExam.map((exam) => exam.id);
      const mockExamQuestion = await this.mockExamQuestions.find({
        where: {
          mockExam: In(mockExamIds),
        },
        relations: {
          mockExam: true,
        },
      });
      category.mockExam = category.mockExam.map((exam) => {
        const questions = mockExamQuestion.filter(
          (question) => question.mockExam.id === exam.id,
        );
        return {
          ...exam,
          mockExamQuestion: questions,
        };
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
              ...(id ? { id } : {}),
              ...(name ? { name } : {}),
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
      // 카테고리 내의 시험들을 정렬한다.
      category.mockExam = sortExams(category.mockExam, category.examOrderIds);

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

  // deprecated
  async readMockExamCategoryNames(): Promise<ReadMockExamCategoryNamesOutput> {
    try {
      const categories = await this.mockExamCategories.find({
        select: ['name', 'isPublic', 'urlSlug'],
      });
      const names = categories
        .filter((category) => category.isPublic)
        .map((category) => category.name);
      const urlSlugs = categories
        .filter((category) => category.isPublic)
        .map((category) => category.urlSlug);

      return {
        ok: true,
        names,
        urlSlugs,
      };
    } catch {
      return {
        ok: false,
        error: '카테고리를 찾을 수 없습니다.',
      };
    }
  }

  async getCategoryNamesAndSlugs(
    getCategoryNamesAndSlugsInput: GetCategoryNamesAndSlugsInput,
  ): Promise<GetCategoryNamesAndSlugsOutput> {
    try {
      const { examType } = getCategoryNamesAndSlugsInput;
      const categories = await this.mockExamCategories.find({
        where: {
          examType,
          isPublic: true,
        },
      });
      const names = categories.map((category) => category.name);
      const urlSlugs = categories.map((category) => category.urlSlug);
      return {
        ok: true,
        names,
        urlSlugs,
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
      const { keyword, limit, page, isPublic, hasExamCount, sort } =
        searchMockExamCategoriesInput;
      const skip = (Number(page) - 1) * Number(limit);
      const formattedKeyword = `%${keyword.replace(/\s+/g, '').toLowerCase()}%`;
      const query = this.mockExamCategories
        .createQueryBuilder('category')
        .leftJoinAndSelect('category.user', 'user')
        .where(
          "(LOWER(REPLACE(category.name, ' ', '')) LIKE :formattedKeyword OR LOWER(REPLACE(user.nickname, ' ', '')) LIKE :formattedKeyword OR LOWER(REPLACE(category.description, ' ', '')) LIKE :formattedKeyword) AND category.isPublic = :isPublic",
          { formattedKeyword, isPublic: isPublic },
        );

      if (sort === 'popular') {
        query.orderBy({
          'category.evaluationCount': 'DESC',
          'category.created_at': 'DESC',
        });
      }

      if (sort === 'recent') {
        query.orderBy('category.created_at', 'DESC');
      }

      const totalCount = await query.getCount();

      let categories = await query.skip(skip).take(limit).getMany();
      if (hasExamCount) {
        categories = await Promise.all(
          categories.map(async (category) => {
            const examsCount = await this.mockExams.count({
              where: {
                mockExamCategory: { id: category.id },
              },
            });
            category.examCount = examsCount;
            return category;
          }),
        );
      }
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

  async moveExamOrder(
    user: User,
    moveExamOrderInput: MoveExamOrderInput,
  ): Promise<MoveExamOrderOutput> {
    try {
      const { startIdx, endIdx, categoryId } = moveExamOrderInput;
      if (startIdx === endIdx) {
        return {
          ok: true,
        };
      }
      const category = await this.mockExamCategories.findOne({
        where: {
          id: categoryId,
          user: {
            id: user.id,
          },
        },
      });
      if (!category) {
        return {
          ok: false,
          error: '카테고리를 찾을 수 없습니다.',
        };
      }
      const examOrderIds = [...category.examOrderIds];
      const [removed] = examOrderIds.splice(startIdx, 1);
      examOrderIds.splice(endIdx, 0, removed);
      category.examOrderIds = examOrderIds;
      await this.mockExamCategories.save(category);
      this.revalidateService.revalidate({
        path:
          category.examType === ExamType.SUBJECTIVE
            ? `/category/${category.urlSlug}`
            : `/mcq/category/${category.urlSlug}`,
      });
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '순서 변경에 실패했습니다.',
      };
    }
  }

  async checkHasCategoryAccess(
    user: User,
    checkHasCategoryAccessInput: CheckHasCategoryAccessInput,
  ) {
    try {
      const { categoryId } = checkHasCategoryAccessInput;
      const category = await this.mockExamCategories.findOne({
        where: {
          id: categoryId,
        },
        relations: {
          user: true,
        },
      });
      if (!category) return { ok: false };
      if (!user) return { ok: false };
      if (category.isPublic) return { ok: true };
      if (category.user.id === user.id) return { ok: true };
      const isInvitedCategories = await this.examCategoryBookmarks.findOne({
        where: {
          category: {
            id: categoryId,
          },
          user: {
            id: user.id,
          },
        },
      });
      if (isInvitedCategories) return { ok: true };
      return { ok: false };
    } catch {
      return {
        ok: false,
        error: '카테고리를 찾을 수 없습니다.',
      };
    }
  }

  async checkIsAccessibleCategory(
    user: User,
    checkIsAccessibleCategory: CheckIsAccessibleCategoryInput,
  ): Promise<CheckIsAccessibleCategoryOutput> {
    try {
      const { examId } = checkIsAccessibleCategory;
      const categories = await this.mockExamCategories.find({
        where: {
          user: {
            id: user.id,
          },
          mockExam: {
            id: examId,
          },
        },
      });
      if (categories.length === 0) {
        return {
          ok: false,
        };
      }
      const isPublicCategories = categories.some(
        (category) => category.isPublic,
      );
      if (isPublicCategories) {
        return {
          ok: true,
        };
      }
      if (!user)
        return {
          ok: false,
        };
      const categoryIds = categories.map((category) => category.id);
      const isInvitedCategories = await this.examCategoryBookmarks.count({
        where: {
          category: {
            id: In(categoryIds),
          },
          user: {
            id: user.id,
          },
        },
      });
      if (isInvitedCategories) {
        return {
          ok: true,
        };
      }
      return {
        ok: false,
      };
    } catch {
      return {
        ok: false,
        error: '카테고리를 찾을 수 없습니다.',
      };
    }
  }

  async getExamCategoriesForAdmin(): Promise<GetExamCategoriesOutput> {
    const categoryQuery = this.mockExamCategories
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.user', 'user')
      .leftJoinAndSelect('category.mockExam', 'mockExam')
      .where('mockExam.id IS NOT NULL');

    let categories = await categoryQuery.getMany();

    const categoryEvaluations = await this.categoryEvaluations.find({
      where: {
        category: In(categories.map((category) => category.id)),
      },
      relations: {
        category: true,
      },
    });
    categories = categories.map((category) => {
      const evaluation = categoryEvaluations.filter(
        (evaluation) => evaluation.category.id === category.id,
      );
      if (evaluation) category.categoryEvaluations = evaluation;
      return category;
    });
    return {
      ok: true,
      categories,
    };
  }
}
