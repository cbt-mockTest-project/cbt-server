import { deduplication } from '../utils/utils';
import { User, UserRole } from '../users/entities/user.entity';
import { MockExamQuestionState } from 'src/exam/entities/mock-exam-question-state.entity';
import {
  ReadMockExamTitlesByCateoryInput,
  ReadMockExamTitlesByCateoryOutput,
} from './dtos/readMockExamTitlesByCateory.dto';
import { ReadMockExamInput, ReadMockExamOutput } from './dtos/readMockExam.dto';
import {
  SearchMockExamInput,
  SearchMockExamOutput,
} from './dtos/searchMockExam.dto';
import {
  ReadAllMockExamsOutput,
  ReadAllMockExamsInput,
} from './dtos/readAllMockExam.dto';
import {
  DeleteMockExamInput,
  DeleteMockExamOutput,
} from './dtos/deleteMockExam.dto';
import { MockExam } from './entities/mock-exam.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository, FindOptionsWhere, Brackets, Not, In } from 'typeorm';
import {
  CreateMockExamInput,
  CreateMockExamOutput,
} from './dtos/createMockExam.dto';
import { EditMockExamInput, EditMockExamOutput } from './dtos/editMockExam.dto';
import {
  FindMyExamHistoryOutput,
  FindMyExamHistoryInput,
  TitleAndId,
} from './dtos/findMyExamHistory.dto';
import {
  UpdateExamOrderInput,
  UpdateExamOrderOutput,
} from './dtos/updateExamOrder.dto';
import { GetMyExamsInput, GetMyExamsOutput } from './dtos/getMyExams.dto';
import {
  AddExamToCategoryInput,
  AddExamToCategoryOutput,
} from './dtos/addExamToCategory.dto';
import {
  RemoveExamFromCategoryInput,
  RemoveExamFromCategoryOutput,
} from './dtos/removeExamFromCategory.dto';
import { MockExamBookmark } from 'src/exam-bookmark/entities/mock-exam-bookmark.entity';
import {
  ExamType,
  MockExamCategory,
} from 'src/exam-category/entities/mock-exam-category.entity';
import { ExamSource } from 'src/enums/enum';
import { SaveExamInput, SaveExamOutput } from './dtos/saveExam.dto';
import { MockExamQuestion } from './entities/mock-exam-question.entity';
import { sortQuestions } from 'src/lib/utils/sortQuestions';
import { pick, omit } from 'lodash';
import { RevalidateService } from 'src/revalidate/revalidate.service';

@Injectable()
export class MockExamService {
  constructor(
    @InjectRepository(MockExamBookmark)
    private readonly mockExamBookmark: Repository<MockExamBookmark>,
    @InjectRepository(MockExam)
    private readonly mockExam: Repository<MockExam>,
    @InjectRepository(MockExamCategory)
    private readonly mockExamCategory: Repository<MockExamCategory>,
    @InjectRepository(MockExamQuestionState)
    private readonly mockExamQuestionState: Repository<MockExamQuestionState>,
    @InjectRepository(MockExamQuestion)
    private readonly mockExamQuestion: Repository<MockExamQuestion>,
    private readonly revalidateService: RevalidateService,
  ) {}

  async createMockExam(
    user: User,
    createMockExamInput: CreateMockExamInput,
  ): Promise<CreateMockExamOutput> {
    const { title, categoryName } = createMockExamInput;
    const exists = await this.mockExam.findOne({ where: { title } });
    if (exists) {
      return {
        ok: false,
        error: '이미 존재하는 시험입니다.',
      };
    }

    const mockExamCategory = await this.mockExamCategory.findOne({
      where: { name: categoryName },
    });
    if (!mockExamCategory) {
      return {
        ok: false,
        error: '존재하지 않는 카테고리입니다.',
      };
    }
    const newMockExam = this.mockExam.create({
      title,
      mockExamCategory: [mockExamCategory],
      approved: false,
      source: user.id === 1 ? ExamSource.MOUD_CBT : ExamSource.USER,
      user,
    });
    const mockExam = await this.mockExam.save(newMockExam);
    return {
      ok: true,
      mockExam,
    };
  }

  async updateExamOrder(
    user: User,
    updateExamOrderInput: UpdateExamOrderInput,
  ): Promise<UpdateExamOrderOutput> {
    try {
      const { examOrders } = updateExamOrderInput;
      const examIds = examOrders.map((examOrder) => examOrder.examId);
      const mockExams = await this.mockExam.find({
        where: {
          id: Raw((id) => `${id} IN (${examIds})`),
          user: {
            id: user.id,
          },
        },
      });
      const updatedMockExams = mockExams.map((mockExam) => {
        const examOrder = examOrders.find(
          (examOrder) => examOrder.examId === mockExam.id,
        );
        mockExam.order = examOrder.order;
        return mockExam;
      });
      const savedMockExams = await this.mockExam.save(updatedMockExams);
      return {
        ok: true,
        mockExams: savedMockExams,
      };
    } catch (e) {
      return {
        ok: false,
        error: '순서 변경에 실패했습니다. 다시 시도해주세요.',
      };
    }
  }

  async editMockExam(
    user: User,
    editMockExamInput: EditMockExamInput,
  ): Promise<EditMockExamOutput> {
    const { id } = editMockExamInput;
    const prevMockExam = await this.mockExam.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!prevMockExam) {
      return {
        ok: false,
        error: '존재하지 않는 시험입니다.',
      };
    }

    if (prevMockExam.user.id !== user.id) {
      return {
        ok: false,
        error: '권한이 없습니다.',
      };
    }

    await this.mockExam.save([editMockExamInput]);
    return { ok: true };
  }

  async deleteMockExam(
    user: User,
    deleteMockExamInput: DeleteMockExamInput,
  ): Promise<DeleteMockExamOutput> {
    try {
      const { id } = deleteMockExamInput;
      const [prevMockExam, categories] = await Promise.all([
        this.mockExam.findOne({
          where: { id },
          relations: { user: true },
        }),
        this.mockExamCategory.find({
          where: {
            mockExam: {
              id,
            },
          },
        }),
      ]);
      if (!prevMockExam) {
        return {
          ok: false,
          error: '존재하지 않는 시험입니다.',
        };
      }
      if (prevMockExam.user.id !== user.id) {
        return {
          ok: false,
          error: '권한이 없습니다.',
        };
      }
      if (categories.length > 0) {
        categories.forEach((category) => {
          this.revalidateService.revalidate({
            path:
              category.examType === ExamType.SUBJECTIVE
                ? `/category/${category.urlSlug}`
                : `/mcq/category/${category.urlSlug}`,
          });
        });
      }

      await this.mockExam.delete({ id });
      return { ok: true };
    } catch (e) {
      return {
        ok: false,
        error: '시험지 삭제에 실패했습니다.',
      };
    }
  }

  async readAllMockExam(
    readAllMockExamsInput: ReadAllMockExamsInput,
  ): Promise<ReadAllMockExamsOutput> {
    try {
      const { query, category, all, approved, examType } =
        readAllMockExamsInput;
      let mockExams = await this.mockExam.find({
        where: {
          title: Raw((title) => `${title} ILIKE '%${query}%'`),
          mockExamCategory: {
            name: Raw((name) => `${name} ILIKE '%${category}%'`),
          },
          examType,
          ...(approved ? { approved } : {}),
        },
        relations: { mockExamQuestion: true },
        order: {
          title: 'ASC',
        },
      });
      if (!all) {
        mockExams = mockExams.filter(
          (exam) => exam.mockExamQuestion.length >= 1 && exam.approved,
        );
      }
      return { ok: true, mockExams };
    } catch {
      return {
        ok: false,
        error: '시험을 찾을 수 없습니다.',
      };
    }
  }

  async searchMockExam(
    searchMockExamInput: SearchMockExamInput,
  ): Promise<SearchMockExamOutput> {
    try {
      const { query } = searchMockExamInput;
      const [mockExams, totalResults] = await this.mockExam.findAndCount({
        where: {
          title: Raw((title) => `${title} ILIKE '%${query}%'`),
        },
        relations: ['mockExamQuestion'],
      });
      return {
        ok: true,
        totalResults,
        mockExams,
      };
    } catch {
      return {
        ok: false,
        error: '시험을 검색할 수  없습니다.',
      };
    }
  }

  async readMockExam(
    readMockExamInput: ReadMockExamInput,
  ): Promise<ReadMockExamOutput> {
    try {
      const { id } = readMockExamInput;
      const mockExam = await this.mockExam.findOne({
        where: { id },
        relations: {
          mockExamQuestion: true,
        },
      });
      mockExam.mockExamQuestion = sortQuestions(
        mockExam.mockExamQuestion,
        mockExam.questionOrderIds,
      );
      return {
        ok: true,
        mockExam,
      };
    } catch {
      return {
        ok: false,
        error: '시험을 찾을 수 없습니다.',
      };
    }
  }

  async readMockExamTitlesByCateory(
    user: User,
    readMockExamTitlesByCateoryInput: ReadMockExamTitlesByCateoryInput,
  ): Promise<ReadMockExamTitlesByCateoryOutput> {
    try {
      const { name, id, all, source } = readMockExamTitlesByCateoryInput;
      let mockExamTitles: MockExam[] = [];
      if (!all) {
        let query = this.mockExam
          .createQueryBuilder('mockExam')
          .leftJoin('mockExam.user', 'user')
          .leftJoin('mockExam.mockExamCategory', 'category')
          .select([
            'mockExam.id',
            'mockExam.title',
            'mockExam.status',
            'mockExam.slug',
            'mockExam.order',
            'user.role',
          ])
          .andWhere('mockExam.source = :source', {
            source: source || ExamSource.MOUD_CBT,
          })
          .andWhere('mockExam.approved = true');

        if (name) {
          query.andWhere('category.name = :name', { name });
        }
        if (id) {
          query.andWhere('category.id = :id', { id });
        }
        query = query.orderBy({
          'mockExam.order': 'ASC',
          'mockExam.title': 'DESC',
        });
        mockExamTitles = await query.getMany();
      } else if (all && user) {
        // 내 시험지에서 타이틀 불러오기 할 경우
        if (!user) {
          return {
            ok: false,
            error: '로그인이 필요합니다.',
          };
        }
        if (user.role === UserRole.ADMIN) {
          let query = this.mockExam
            .createQueryBuilder('mockExam')
            .leftJoin('mockExam.user', 'user')
            .leftJoin('mockExam.mockExamCategory', 'category')
            .leftJoin('mockExam.examCoAuthor', 'examCoAuthor')
            .select([
              'mockExam.id',
              'mockExam.title',
              'mockExam.status',
              'mockExam.slug',
              'mockExam.order',
              'user.role',
            ]);
          if (name) {
            query = query.andWhere('category.name = :name', { name });
          }
          if (id) {
            query = query.andWhere('category.id = :id', { id });
          }
          query = query.orderBy({
            'mockExam.order': 'ASC',
            'mockExam.title': 'DESC',
          });

          mockExamTitles = await query.getMany();
        } else {
          const query = this.mockExam
            .createQueryBuilder('mockExam')
            .leftJoin('mockExam.user', 'user')
            .leftJoin('mockExam.mockExamCategory', 'category')
            .leftJoin('mockExam.examCoAuthor', 'examCoAuthor')
            .select([
              'mockExam.id',
              'mockExam.title',
              'mockExam.status',
              'mockExam.slug',
              'mockExam.order',
              'user.role',
            ])
            .andWhere(
              new Brackets((qb) => {
                qb.where('mockExam.user.id = :userId', {
                  userId: user.id,
                }).orWhere('examCoAuthor.user.id = :userId', {
                  userId: user.id,
                });
              }),
            );
          if (name) {
            query.andWhere('category.name = :name', { name });
          }
          if (id) {
            query.andWhere('category.id = :id', { id });
          }
          query.orderBy({
            'mockExam.order': 'ASC',
            'mockExam.title': 'DESC',
          });

          mockExamTitles = await query.getMany();
          const invitedExamCategory = await this.mockExamCategory.findOne({
            where: {
              name,
              examViewer: {
                user: {
                  id: user.id,
                },
                isApprove: true,
              },
            },
            relations: {
              mockExam: true,
            },
          });
          if (invitedExamCategory) {
            mockExamTitles = [
              ...mockExamTitles,
              ...invitedExamCategory.mockExam,
            ];
          }
        }
      }
      if (!mockExamTitles) {
        return {
          ok: false,
          error: '해당 카테고리에 맞는 시험이 존재하지 않습니다.',
        };
      }
      return {
        titles: mockExamTitles,
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: '타이틀을 찾을 수 없습니다.',
      };
    }
  }

  async findMyExamHistory(
    user: User,
    findMyExamHistoryInput: FindMyExamHistoryInput,
  ): Promise<FindMyExamHistoryOutput> {
    try {
      const commonAndConditions = { user: { id: user.id } };
      const { categoryIds } = findMyExamHistoryInput;
      const where:
        | FindOptionsWhere<MockExamQuestionState>[]
        | FindOptionsWhere<MockExamQuestionState> =
        categoryIds.length !== 0
          ? categoryIds.map((id) => ({
              ...commonAndConditions,
              exam: { mockExamCategory: { id } },
            }))
          : commonAndConditions;
      const res = await this.mockExamQuestionState.find({
        where,
        select: ['exam'],
        relations: {
          exam: true,
        },
      });
      if (!res) {
        return {
          ok: false,
          error: '시험내역이 존재하지 않습니다.',
        };
      }
      const examsTitleAndId: TitleAndId[] = deduplication(
        res.map((el) => ({ id: el.exam.id, title: el.exam.title })),
      ).sort((a, b) => {
        return Number(a.title.split('년')[0]) - Number(b.title.split('년')[0]);
      });
      return {
        ok: true,
        titleAndId: examsTitleAndId,
      };
    } catch {
      return {
        ok: false,
        error: '시험기록을 조회할 수 없습니다.',
      };
    }
  }

  async getMyExams(
    user: User,
    getMyExams: GetMyExamsInput,
  ): Promise<GetMyExamsOutput> {
    try {
      const { isBookmarked, examType } = getMyExams;
      let exams: MockExam[] = [];
      if (isBookmarked) {
        const bookmarks = await this.mockExamBookmark.find({
          where: {
            user: {
              id: user.id,
            },
            ...(examType ? { exam: { examType } } : {}),
          },
          relations: {
            exam: {
              user: true,
              mockExamQuestion: true,
            },
          },
          order: {
            exam: {
              order: 'ASC',
              created_at: 'DESC',
            },
          },
        });
        exams = bookmarks.map((bookmark) => ({
          ...bookmark.exam,
          isBookmarked: true,
        }));
        return {
          ok: true,
          exams,
        };
      }
      exams = await this.mockExam.find({
        where: {
          user: {
            id: user.id,
          },
          ...(examType ? { examType } : {}),
        },
        relations: {
          user: true,
          mockExamQuestion: true,
        },
        order: {
          order: 'ASC',
          created_at: 'DESC',
        },
      });
      return {
        ok: true,
        exams,
      };
    } catch {
      return {
        ok: false,
        error: '시험지를 불러올 수 없습니다.',
      };
    }
  }

  async addExamToCategory(
    user: User,
    addExamToCategoryInput: AddExamToCategoryInput,
  ): Promise<AddExamToCategoryOutput> {
    const queryRunner =
      this.mockExamCategory.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { examId, categoryId } = addExamToCategoryInput;
      const exam = await this.mockExam.findOne({
        where: {
          id: examId,
        },
      });
      if (!exam) {
        return {
          ok: false,
          error: '시험지를 찾을 수 없습니다.',
        };
      }
      const category = await this.mockExamCategory.findOne({
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
          error: '폴더를 찾을 수 없습니다.',
        };
      }
      const exitingRelation = await this.mockExam
        .createQueryBuilder()
        .relation(MockExam, 'mockExamCategory')
        .of(examId)
        .loadMany();
      if (exitingRelation.find((relation) => relation.id === categoryId)) {
        return {
          ok: false,
          error: '이미 폴더에 추가되어 있습니다.',
        };
      }

      await queryRunner.manager
        .createQueryBuilder()
        .relation(MockExam, 'mockExamCategory')
        .of(examId)
        .add(categoryId);

      category.examOrderIds = [examId, ...category.examOrderIds];
      await queryRunner.manager.save(MockExamCategory, category);
      await queryRunner.commitTransaction();
      return {
        ok: true,
      };
    } catch (e) {
      await queryRunner.rollbackTransaction();
      return {
        ok: false,
        error: '폴더를 추가하는데 실패했습니다.',
      };
    } finally {
      await queryRunner.release();
    }
  }

  async removeExamFromCategory(
    user: User,
    removeExamFromCategoryInput: RemoveExamFromCategoryInput,
  ): Promise<RemoveExamFromCategoryOutput> {
    const queryRunner =
      this.mockExamCategory.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { examId, categoryId } = removeExamFromCategoryInput;
      const exam = await this.mockExam.findOne({
        where: {
          id: examId,
        },
      });
      if (!exam) {
        return {
          ok: false,
          error: '시험지를 찾을 수 없습니다.',
        };
      }
      const category = await this.mockExamCategory.findOne({
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
          error: '폴더를 찾을 수 없습니다.',
        };
      }

      const exitingRelation = await this.mockExam
        .createQueryBuilder()
        .relation(MockExam, 'mockExamCategory')
        .of(examId)
        .loadMany();
      this.revalidateService.revalidate({
        path:
          category.examType === ExamType.SUBJECTIVE
            ? `/category/${category.urlSlug}`
            : `/mcq/category/${category.urlSlug}`,
      });
      if (!exitingRelation.find((relation) => relation.id === categoryId)) {
        return {
          ok: false,
          error: '폴더에 추가되어 있지 않습니다.',
        };
      }

      await queryRunner.manager
        .createQueryBuilder()
        .relation(MockExam, 'mockExamCategory')
        .of(examId)
        .remove(categoryId);

      category.examOrderIds = category.examOrderIds.filter(
        (id) => id !== examId,
      );
      await queryRunner.manager.save(MockExamCategory, category);
      await queryRunner.commitTransaction();
      return {
        ok: true,
      };
    } catch {
      await queryRunner.rollbackTransaction();
      return {
        ok: false,
        error: '폴더를 삭제하는데 실패했습니다.',
      };
    } finally {
      await queryRunner.release();
    }
  }

  async saveExam(
    user: User,
    saveExamInput: SaveExamInput,
  ): Promise<SaveExamOutput> {
    try {
      const { title, questionOrderIds, questions, uuid, categoryId, examType } =
        saveExamInput;
      const [prevMockExam, prevQuestions, prevCategory] = await Promise.all([
        this.mockExam.findOne({
          where: { uuid },
          relations: { user: true },
        }),
        this.mockExamQuestion.find({
          where: {
            mockExam: {
              uuid,
            },
            orderId: In(questions.map((question) => question.orderId)),
          },
        }),
        categoryId
          ? this.mockExamCategory.findOne({
              where: { id: categoryId, user: { id: user.id } },
            })
          : null,
      ]);
      if (categoryId) {
        if (!prevCategory) {
          return {
            ok: false,
            error: '존재하지 않는 폴더입니다.',
          };
        }
      }
      if (prevMockExam) {
        if (prevMockExam.user.id !== user.id) {
          return {
            ok: false,
            error: '권한이 없습니다.',
          };
        }
      }
      const newQuestions = questions.map((question) => {
        const prevQuestion = prevQuestions.find(
          (prevQuestion) => prevQuestion.orderId === question.orderId,
        );

        if (prevQuestion) {
          return this.mockExamQuestion.merge(prevQuestion, {
            ...question,
            question_img: question.question_img?.[0]
              ? [
                  {
                    ...prevQuestion.question_img?.[0],
                    ...pick(question.question_img[0], ['name', 'url', 'uid']),
                  },
                ]
              : [],
            solution_img: question.solution_img?.[0]
              ? [
                  {
                    ...prevQuestion.solution_img?.[0],
                    ...pick(question.solution_img[0], ['name', 'url', 'uid']),
                  },
                ]
              : [],
            user,
          });
        }
        return this.mockExamQuestion.create({
          ...question,
          user,
        });
      });
      const exam = await this.mockExam.save({
        ...prevMockExam,
        ...(prevCategory?.isPublic && { approved: true }),
        ...(!prevCategory?.isPublic && { approved: false }),
        examType,
        title,
        uuid,
        mockExamQuestion: newQuestions,
        questionOrderIds,
        user,
      });
      await Promise.all(
        questions.map(async (question) => {
          if (question.linkedQuestionIds.length > 0) {
            await this.mockExamQuestion.update(
              question.linkedQuestionIds,
              omit(question, [
                'id',
                'orderId',
                'isBookmarked',
                'commentCount',
                'myQuestionState',
              ]),
            );
          }
        }),
      );
      if (categoryId) {
        const exitingRelation = await this.mockExam
          .createQueryBuilder()
          .relation(MockExam, 'mockExamCategory')
          .of(exam.id)
          .loadMany();
        if (!exitingRelation.find((relation) => relation.id === categoryId)) {
          await this.mockExam
            .createQueryBuilder()
            .relation(MockExam, 'mockExamCategory')
            .of(exam.id)
            .add(categoryId);
          await this.mockExamCategory.save({
            ...prevCategory,
            examOrderIds: [exam.id, ...prevCategory.examOrderIds],
          });
        }
        this.revalidateService.revalidate({
          path: `/exam/solution/${exam.id}`,
        });
        //10초 지연
        this.revalidateService.revalidate({
          path:
            prevCategory.examType === ExamType.SUBJECTIVE
              ? `/category/${prevCategory.urlSlug}`
              : `/mcq/category/${prevCategory.urlSlug}`,
        });
        if (exitingRelation.find((relation) => relation.id === categoryId)) {
          return {
            examId: exam.id,
            ok: true,
          };
        }
      }

      return {
        examId: exam.id,
        ok: true,
      };
    } catch (e) {
      if (e.code === '23505') {
        return {
          ok: false,
          error: '시험지 제목이 중복됩니다.',
        };
      }
      return {
        ok: false,
        error: '시험지 저장에 실패했습니다.',
      };
    }
  }
}
