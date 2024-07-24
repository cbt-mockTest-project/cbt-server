/* eslint-disable prefer-const */
import { ExamCoAuthor } from '../exam-co-author/entities/exam-co-author.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MockExamQuestionBookmark } from 'src/exam/entities/mock-exam-question-bookmark.entity';
import { User, UserRole } from 'src/users/entities/user.entity';
import { shuffleArray } from 'src/utils/utils';
import { FindOptionsWhere, In, IsNull, Not, Repository } from 'typeorm';
import {
  CreateMockExamQuestionInput,
  CreateMockExamQuestionOutput,
} from './dtos/createMockExamQuestion.dto';
import {
  DeleteMockExamQuestionInput,
  DeleteMockExamQuestionOutput,
} from './dtos/deleteMockExamQuestion.dto';
import {
  EditMockExamQuestionInput,
  EditMockExamQuestionOutput,
} from './dtos/editMockExamQuestion.dto';
import { ReadAllMockExamQuestionOutput } from './dtos/readAllMockExamQuestion.dto';
import {
  ReadAllQuestionsInput,
  ReadAllQuestionsOutput,
} from './dtos/readAllQuestions.dto';
import {
  ReadMockExamQuestionInput,
  ReadMockExamQuestionOutput,
} from './dtos/readMockExamQuestion.dto';
import {
  QuestionNumber,
  ReadMockExamQuestionNumbersInput,
  ReadMockExamQuestionNumbersOutput,
} from './dtos/readMockExamQuestionNumbers.dto';
import {
  ReadMockExamQuestionsByMockExamIdInput,
  ReadMockExamQuestionsByMockExamIdOutput,
} from './dtos/readMockExamQuestionsByMockExamId.dto';
import {
  ReadMockExamQuestionsByStateInput,
  ReadMockExamQuestionsByStateOutput,
} from './dtos/readMockExamQuestionsByState.dto';
import {
  UpdateApprovedStateOfMockExamQuestionInput,
  UpdateApprovedStateOfMockExamQuestionOutput,
} from './dtos/updateApprovedStateOfMockExamQuestion.dto';
import { MockExamQuestionComment } from './entities/mock-exam-question-comment.entity';
import { QuestionFeedbackRecommendationType } from './entities/mock-exam-question-feedback-recommendation.entity';
import {
  MockExamQuestionFeedback,
  MyRecommedationStatus,
  QuestionFeedbackType,
  RecommendationCount,
} from './entities/mock-exam-question-feedback.entity';
import {
  MockExamQuestionState,
  QuestionState,
} from './entities/mock-exam-question-state.entity';
import { MockExamQuestion } from './entities/mock-exam-question.entity';
import { MockExam } from './entities/mock-exam.entity';
import {
  SearchQuestionsByKeywordInput,
  SearchQuestionsByKeywordOutput,
} from './dtos/searchQuestionsByKeyword.dto';
import {
  ReadQuestionsByExamIdsInput,
  ReadQuestionsByExamIdsOutput,
} from './dtos/readQuestionsByExamIds.dto';
import { sortQuestions } from 'src/lib/utils/sortQuestions';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';
import { ExamSource } from 'src/enums/enum';
import {
  UpdateLinkedQuestionIdsInput,
  UpdateLinkedQuestionIdsOutput,
} from './dtos/updateLinkedQuestionIds.dto';
import {
  ReadBookmarkedQuestionsInput,
  ReadBookmarkedQuestionsOutput,
} from './dtos/readBookmarkedQuestions.dto';
import { TextHighlight } from 'src/text-highlight/entites/text-highlight.entity';

@Injectable()
export class MockExamQuestionService {
  constructor(
    @InjectRepository(TextHighlight)
    private readonly textHighlights: Repository<TextHighlight>,
    @InjectRepository(MockExamQuestion)
    private readonly mockExamQuestion: Repository<MockExamQuestion>,
    @InjectRepository(MockExam)
    private readonly mockExam: Repository<MockExam>,
    @InjectRepository(MockExamQuestionState)
    private readonly mockExamQuestionState: Repository<MockExamQuestionState>,
    @InjectRepository(MockExamQuestionBookmark)
    private readonly mockExamQuestionBookmark: Repository<MockExamQuestionBookmark>,
    @InjectRepository(MockExamQuestionFeedback)
    private readonly mockExamQuestionFeedback: Repository<MockExamQuestionFeedback>,
    @InjectRepository(MockExamQuestionComment)
    private readonly mockExamQuestionComment: Repository<MockExamQuestionComment>,
    @InjectRepository(MockExamCategory)
    private readonly mockExamCategory: Repository<MockExamCategory>,
    @InjectRepository(ExamCoAuthor)
    private readonly examCoAuthor: Repository<ExamCoAuthor>,
  ) {}

  async createMockExamQuestion(
    user: User,
    createMockExamQuestionInput: CreateMockExamQuestionInput,
  ): Promise<CreateMockExamQuestionOutput> {
    try {
      const {
        question,
        question_img,
        solution,
        solution_img,
        mockExamId,
        number,
        label,
      } = createMockExamQuestionInput;
      const mockExam = await this.mockExam.findOne({
        relations: { user: true },
        where: { id: mockExamId },
      });
      const questions = await this.mockExamQuestion.find({
        where: {
          mockExam: {
            id: mockExamId,
          },
        },
      });
      const questionNumbers = questions.map((question) => question.number);
      if (questionNumbers.includes(number)) {
        return {
          ok: false,
          error: '이미 존재하는 문제 번호입니다',
        };
      }
      if (!mockExam) {
        return {
          ok: false,
          error: '존재하지 않는 시험입니다.',
        };
      }
      const coAuthor = await this.examCoAuthor.findOne({
        where: {
          user: {
            id: user.id,
          },
          exam: {
            id: mockExamId,
          },
        },
      });
      const isCoAuthor = coAuthor ? true : false;
      const isOwner = mockExam.user.id === user.id || isCoAuthor;
      if (!isOwner) {
        return {
          ok: false,
          error: '권한이 없습니다.',
        };
      }
      const newExamQuestion = this.mockExamQuestion.create({
        question,
        question_img,
        solution,
        solution_img,
        mockExam,
        approved: false,
        number,
        user,
        label,
      });
      const savedQestion = await this.mockExamQuestion.save(newExamQuestion);
      return { ok: true, questionId: savedQestion.id };
    } catch {
      return { ok: false, error: '문제를 만들 수 없습니다' };
    }
  }

  /**
   * toggle approved state
   */
  async updateApprovedStateOfMockExamQuestion(
    updateApprovedStateOfMockExamQuestionInput: UpdateApprovedStateOfMockExamQuestionInput,
  ): Promise<UpdateApprovedStateOfMockExamQuestionOutput> {
    const { questionId } = updateApprovedStateOfMockExamQuestionInput;
    const question = await this.mockExamQuestion.findOne({
      where: {
        id: questionId,
      },
    });
    if (!question) {
      return {
        ok: false,
        error: '존재하지 않는 문제입니다.',
      };
    }
    if (question.approved) {
      await this.mockExamQuestion.update(questionId, { approved: false });
    } else {
      await this.mockExamQuestion.update(questionId, { approved: true });
    }
    return {
      ok: true,
      currentApprovedState: false,
      questionId,
    };
  }

  async readMockExamQuestion(
    readMockExamQuestionInput: ReadMockExamQuestionInput,
    user: User,
  ): Promise<ReadMockExamQuestionOutput> {
    try {
      const { questionId, examId } = readMockExamQuestionInput;
      let questionStates: MockExamQuestionState[] = [];
      let questionBookmarks: MockExamQuestionBookmark[] = [];
      let questionFeedbacks: MockExamQuestionFeedback[] = [];
      let questionComments: MockExamQuestionComment[] = [];
      const makeQuestionJoins = async (question: MockExamQuestion) => {
        await Promise.all([
          user
            ? this.mockExamQuestionState
                .find({
                  relations: { question: true },
                  where: {
                    question: {
                      id: question.id,
                    },
                    user: {
                      id: user.id,
                    },
                  },
                })
                .then((states) => (questionStates = states))
            : (questionStates = []),
          user
            ? this.mockExamQuestionBookmark
                .find({
                  relations: { question: true, user: true },
                  where: {
                    question: {
                      id: question.id,
                    },
                    user: {
                      id: user.id,
                    },
                  },
                })
                .then((bookmarks) => (questionBookmarks = bookmarks))
            : (questionBookmarks = []),
          this.mockExamQuestionFeedback
            .find({
              relations: {
                mockExamQuestion: true,
                user: true,
                recommendation: { user: true },
              },
              where: {
                mockExamQuestion: {
                  id: question.id,
                },
              },
              order: {
                type: 'ASC',
              },
            })
            .then((feedbacks) => (questionFeedbacks = feedbacks)),
          this.mockExamQuestionComment
            .find({
              relations: { question: true, user: true },
              where: {
                question: {
                  id: question.id,
                },
              },
            })
            .then((comments) => (questionComments = comments)),
        ]);
        const result: MockExamQuestion = {
          ...question,
          myQuestionState: questionStates.find(
            (state) => state.question.id === question.id,
          )?.state,
          isBookmarked: !!questionBookmarks.find(
            (bookmark) => bookmark.question.id === question.id,
          ),
          mockExamQuestionComment: questionComments.filter(
            (comment) => comment.question.id === question.id,
          ),
          mockExamQuestionFeedback: questionFeedbacks
            .filter(
              (feedback) =>
                feedback.mockExamQuestion.id === question.id &&
                (feedback.type !== QuestionFeedbackType.PRIVATE ||
                  (feedback.type === QuestionFeedbackType.PRIVATE &&
                    feedback.user.id === user?.id)),
            )
            .map((feedback) => {
              const goodCount = feedback.recommendation.filter(
                (recommendation) =>
                  recommendation.type ===
                  QuestionFeedbackRecommendationType.GOOD,
              ).length;
              const badCount = feedback.recommendation.filter(
                (recommendation) =>
                  recommendation.type ===
                  QuestionFeedbackRecommendationType.BAD,
              ).length;
              const myRecommedationStatus: MyRecommedationStatus = {
                isGood: false,
                isBad: false,
              };
              feedback.recommendation.forEach((recommendation) => {
                if (recommendation.user?.id === user?.id) {
                  if (
                    recommendation.type ===
                    QuestionFeedbackRecommendationType.GOOD
                  ) {
                    myRecommedationStatus.isGood = true;
                  }
                  if (
                    recommendation.type ===
                    QuestionFeedbackRecommendationType.BAD
                  ) {
                    myRecommedationStatus.isBad = true;
                  }
                }
              });
              const recommendationCount: RecommendationCount = {
                good: goodCount,
                bad: badCount,
              };
              return {
                ...feedback,
                recommendationCount,
                myRecommedationStatus,
              };
            })
            .sort(
              (a, b) =>
                b.recommendationCount.good - a.recommendationCount.good ||
                a.recommendationCount.bad - b.recommendationCount.bad,
            ),
        };
        return result;
      };
      const where: FindOptionsWhere<MockExamQuestion> = examId
        ? {
            id: questionId,
            mockExam: { id: examId },
          }
        : {
            id: questionId,
          };

      let question = await this.mockExamQuestion.findOne({
        where,
        relations: {
          user: true,
          mockExam: true,
        },
      });
      question = await makeQuestionJoins(question);
      return {
        ok: true,
        mockExamQusetion: question,
      };
    } catch (e) {
      return {
        ok: false,
        error: '문제를 가져오는데 실패했습니다.',
      };
    }
  }

  async editMockExamQuestion(
    user: User,
    editMockExamQuestionInput: EditMockExamQuestionInput,
  ): Promise<EditMockExamQuestionOutput> {
    try {
      const {
        id,
        question,
        question_img,
        solution,
        solution_img,
        label,
        linkedQuestionIds,
      } = editMockExamQuestionInput;
      const prevMockExamQuestion = await this.mockExamQuestion.findOne({
        where: { id },
        relations: { user: true, mockExam: true },
      });

      if (!prevMockExamQuestion) {
        return {
          ok: false,
          error: '존재하지 않는 문제입니다.',
        };
      }

      const isOwner =
        prevMockExamQuestion.user.id === user.id ||
        user.role === UserRole.ADMIN;
      if (!isOwner) {
        return {
          ok: false,
          error: '권한이 없습니다.',
        };
      }
      const dataToUpdate = {
        question,
        question_img,
        solution,
        solution_img,
        linkedQuestionIds,
      };
      if (label) {
        dataToUpdate['label'] = label;
      }
      if (linkedQuestionIds.length > 0) {
        await this.mockExamQuestion.update(
          Array.from(new Set([...linkedQuestionIds, id])),
          {
            ...dataToUpdate,
          },
        );
      } else {
        await this.mockExamQuestion.update(id, dataToUpdate);
      }

      return {
        ok: true,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: '문제를 수정할 수 없습니다.',
      };
    }
  }

  async deleteMockExamQuestion(
    user: User,
    deleteMockExamQuestionInput: DeleteMockExamQuestionInput,
  ): Promise<DeleteMockExamQuestionOutput> {
    try {
      const { id } = deleteMockExamQuestionInput;
      const mockExamQuestion = await this.mockExamQuestion.findOne({
        where: { id },
        relations: { user: true, mockExam: true },
      });
      if (!mockExamQuestion) {
        return {
          ok: false,
          error: '존재하지 않는 문제입니다.',
        };
      }
      const coAuthor = await this.examCoAuthor.findOne({
        where: {
          user: {
            id: user.id,
          },
          exam: {
            id: mockExamQuestion.mockExam.id,
          },
        },
      });
      const isCoAuthor = coAuthor ? true : false;
      const isOwner = mockExamQuestion.user.id === user.id || isCoAuthor;
      if (!isOwner) {
        return {
          ok: false,
          error: '권한이 없습니다.',
        };
      }
      await this.mockExamQuestion.delete({ id });
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '문제를 삭제할 수 없습니다.',
      };
    }
  }
  async readAllQuestions(
    readAllQuestionsInput: ReadAllQuestionsInput,
  ): Promise<ReadAllQuestionsOutput> {
    const { page, limit } = readAllQuestionsInput;
    try {
      const questions = await this.mockExamQuestion.find({
        ...(page ? { skip: (page - 1) * limit } : {}),
        ...(limit ? { take: limit } : {}),
        order: { id: 'ASC' },
      });
      return {
        questions,
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '문제를 불러오지 못했습니다.',
      };
    }
  }

  // bookmarkedQuestions - 추후 네이밍 변경 예정
  async readAllMockExamQuestion(
    user: User,
  ): Promise<ReadAllMockExamQuestionOutput> {
    try {
      const mockExamQuestions = await this.mockExamQuestion.find({
        relations: {
          mockExamQuestionFeedback: true,
          mockExamQuestionBookmark: { user: true },
        },
        where: {
          mockExamQuestionBookmark: {
            user: {
              id: user && user.id,
            },
          },
        },
      });
      return {
        ok: true,
        mockExamQuestions,
      };
    } catch {
      return {
        ok: false,
        error: '시험문제를 찾을 수 없습니다.',
      };
    }
  }
  /** deprecated */
  async readMockExamQuestionsByMockExamId(
    readMockExamQuestionsByMockExamIdInput: ReadMockExamQuestionsByMockExamIdInput,
    user: User,
  ): Promise<ReadMockExamQuestionsByMockExamIdOutput> {
    try {
      const { id, bookmarked, ids, states, limit } =
        readMockExamQuestionsByMockExamIdInput;
      let questionStates: MockExamQuestionState[] = [];
      let questionBookmarks: MockExamQuestionBookmark[] = [];
      let questionFeedbacks: MockExamQuestionFeedback[] = [];
      let questionComments: MockExamQuestionComment[] = [];

      const makeQuestionJoins = async (questions: MockExamQuestion[]) => {
        const questionIds = questions.map((question) => question.id);
        await Promise.all([
          (questionStates = user
            ? await this.mockExamQuestionState.find({
                relations: { question: true, user: true, exam: true },
                where: {
                  question: In(questionIds),
                  user: {
                    id: user.id,
                  },
                },
              })
            : []),
          (questionBookmarks = user
            ? await this.mockExamQuestionBookmark.find({
                relations: { question: true, user: true },
                where: {
                  question: In(questionIds),
                  user: {
                    id: user.id,
                  },
                },
              })
            : []),
          (questionFeedbacks = await this.mockExamQuestionFeedback.find({
            relations: {
              mockExamQuestion: true,
              user: true,
              recommendation: { user: true },
            },
            where: {
              mockExamQuestion: In(questionIds),
            },
            order: {
              type: 'ASC',
            },
          })),
          (questionComments = await this.mockExamQuestionComment.find({
            relations: { question: true, user: true },
            where: {
              question: In(questionIds),
            },
          })),
        ]);
        const result: MockExamQuestion[] = questions.map((question) => {
          return {
            ...question,
            state: questionStates.filter(
              (state) => state.question.id === question.id,
            ),
            mockExamQuestionBookmark: questionBookmarks.filter(
              (bookmark) => bookmark.question.id === question.id,
            ),
            mockExamQuestionComment: questionComments.filter(
              (comment) => comment.question.id === question.id,
            ),
            mockExamQuestionFeedback: questionFeedbacks
              .filter(
                (feedback) =>
                  feedback.mockExamQuestion.id === question.id &&
                  (feedback.type !== QuestionFeedbackType.PRIVATE ||
                    (feedback.type === QuestionFeedbackType.PRIVATE &&
                      feedback.user.id === user?.id)),
              )
              .map((feedback) => {
                const goodCount = feedback.recommendation.filter(
                  (recommendation) =>
                    recommendation.type ===
                    QuestionFeedbackRecommendationType.GOOD,
                ).length;
                const badCount = feedback.recommendation.filter(
                  (recommendation) =>
                    recommendation.type ===
                    QuestionFeedbackRecommendationType.BAD,
                ).length;
                const myRecommedationStatus: MyRecommedationStatus = {
                  isGood: false,
                  isBad: false,
                };
                feedback.recommendation.forEach((recommendation) => {
                  if (recommendation.user?.id === user?.id) {
                    if (
                      recommendation.type ===
                      QuestionFeedbackRecommendationType.GOOD
                    ) {
                      myRecommedationStatus.isGood = true;
                    }
                    if (
                      recommendation.type ===
                      QuestionFeedbackRecommendationType.BAD
                    ) {
                      myRecommedationStatus.isBad = true;
                    }
                  }
                });
                const recommendationCount: RecommendationCount = {
                  good: goodCount,
                  bad: badCount,
                };
                return {
                  ...feedback,
                  recommendationCount,
                  myRecommedationStatus,
                };
              })
              .sort(
                (a, b) =>
                  b.recommendationCount.good - a.recommendationCount.good ||
                  a.recommendationCount.bad - b.recommendationCount.bad,
              ),
          };
        });
        return result;
      };
      const filterQuestionStates = (questions: MockExamQuestion[]) => {
        const result = questions.map((question) => {
          const filteredState = question.state?.filter(
            (state) => user && state.user?.id === user.id,
          );

          const filteredBookmark = question.mockExamQuestionBookmark?.filter(
            (bookmark) => user && bookmark.user?.id === user.id,
          );

          const coreState = this.mockExamQuestionState.create({
            exam: { id: 1 },
            user,
            state: QuestionState.CORE,
            created_at: new Date(),
            updated_at: new Date(),
            id: 0,
            answer: '',
          });
          return {
            ...question,
            state: filteredState.length >= 1 ? filteredState : [coreState],
            mockExamQuestionBookmark: filteredBookmark,
          };
        });
        return result;
      };

      // 북마크된 게시물 전체
      if (!id && bookmarked) {
        if (!user) {
          return {
            ok: false,
            error: '로그인이 필요합니다.',
          };
        }
        let [questions, count] = await this.mockExamQuestion.findAndCount({
          order: { number: 'ASC' },
          where: {
            mockExamQuestionBookmark: { user: { id: user.id } },
          },
        });
        questions = await makeQuestionJoins(questions);
        return {
          ok: true,
          title: '전체',
          questions,
          count,
        };
      }

      // 랜덤모의고사
      if (ids) {
        if (states) {
          if (!user) {
            return {
              ok: false,
              error: '로그인이 필요합니다.',
              questions: [],
              count: 0,
              title: '전체',
            };
          }
          let coreQuestions: MockExamQuestion[] = [];
          // QuestionState.CORE 인 경우 안 푼 문제를 포함시켜준다
          if (states.includes(QuestionState.CORE)) {
            const allQuestions = await this.mockExamQuestion.find({
              relations: { mockExam: true },
              where: {
                mockExam: {
                  id: In(ids),
                },
              },
            });
            const questionIds = allQuestions.map((q) => q.id);
            const existingQuestionStates =
              await this.mockExamQuestionState.find({
                relations: { question: true, exam: true },
                where: {
                  user: { id: user.id },
                  question: { id: In(questionIds) },
                },
              });

            const existingQuestionStateMap = new Map(
              existingQuestionStates.map((qs) => [qs.question.id, qs]),
            );

            coreQuestions = allQuestions.filter(
              (question) => !existingQuestionStateMap.has(question.id),
            );
          }
          let questionStates = await this.mockExamQuestionState
            .createQueryBuilder('mockExamQuestionState')
            .leftJoinAndSelect('mockExamQuestionState.question', 'question')
            .leftJoinAndSelect('question.mockExam', 'mockExam')
            .where('mockExamQuestionState.user.id = :id', { id: user.id })
            .andWhere('mockExam.id IN (:...ids)', {
              ids,
            })
            .andWhere('mockExamQuestionState.state IN (:...states)', {
              states,
            })
            .limit(limit || 14)
            .orderBy('RANDOM()')
            .getMany();
          let questions = questionStates.map((state) => state.question);
          if (coreQuestions.length > 0) {
            coreQuestions = shuffleArray(coreQuestions).slice(0, limit || 14);
            questions = shuffleArray(questions.concat(coreQuestions)).slice(
              0,
              limit || 14,
            );
          }
          questions = await makeQuestionJoins(questions);
          questions = filterQuestionStates(questions);
          return {
            ok: true,
            questions,
            title: '랜덤모의고사',
            count: questions.length,
            isPremium:
              questions.length > 1 ? questions[0].mockExam.isPremium : false,
          };
        }
        let questions: MockExamQuestion[] = await this.mockExamQuestion
          .createQueryBuilder('mockExamQuestion')
          .leftJoinAndSelect('mockExamQuestion.mockExam', 'mockExam')
          .limit(limit || 14)
          .where('mockExamQuestion.mockExam.id IN (:...ids)', { ids })
          .orderBy('RANDOM()')
          .getMany();
        if (!questions) {
          return {
            ok: false,
            error: '문제가 존재하지 않습니다.',
          };
        }
        questions = await makeQuestionJoins(questions);
        if (!user) {
          questions = questions.map((question) => ({
            ...question,
            mockExamQuestionBookmark: [],
          }));
        }
        if (user) {
          questions = filterQuestionStates(questions);
        }
        return {
          ok: true,
          questions,
          title: '랜덤모의고사',
          count: questions.length,
          isPremium: questions[0].mockExam.isPremium,
        };
      }

      // 모의고사 문제, 북마크된 문제
      const mockExam = await this.mockExam.findOne({
        where: { id },
        relations: { user: true },
      });
      if (!mockExam) {
        return {
          ok: false,
          error: '문제가 존재하지 않습니다.',
        };
      }
      let where: FindOptionsWhere<MockExamQuestion>;
      where = { mockExam: { id } };
      if (bookmarked && user) {
        where = {
          ...where,
          mockExamQuestionBookmark: { user: { id: user.id } },
        };
      }
      if (Array.isArray(states) && user) {
        where = {
          ...where,
          state: {
            user: { id: user.id },
            state: states.length >= 1 ? In(states) : Not(QuestionState.CORE),
          },
        };
      }
      let [questions, count] = await this.mockExamQuestion.findAndCount({
        order: { number: 'ASC' },
        where,
      });
      questions = await makeQuestionJoins(questions);

      if (!user) {
        questions = questions.map((question) => ({
          ...question,
          mockExamQuestionBookmark: [],
        }));
      }
      if (user) {
        questions = filterQuestionStates(questions);
      }
      if (user && bookmarked) {
        questions = questions.filter((question) => {
          if (question.mockExamQuestionBookmark.length === 0) return false;
          const filteredQuestion = question.mockExamQuestionBookmark.filter(
            (el) => el.user.id === user.id,
          );
          if (filteredQuestion.length >= 1) return true;
          return false;
        });
      }
      return {
        ok: true,
        title: mockExam.title,
        author: mockExam.user.nickname,
        isPremium: mockExam.isPremium,
        questions,
        count,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: '문제를 찾을 수 없습니다.',
      };
    }
  }
  /** deprecated */
  async readMockExamQuestionNumbers(
    readMockExamQuestionNumbersInput: ReadMockExamQuestionNumbersInput,
  ): Promise<ReadMockExamQuestionNumbersOutput> {
    const { mockExamId } = readMockExamQuestionNumbersInput;
    const mockExam = await this.mockExam.find({
      where: {
        id: mockExamId,
      },
      relations: {
        mockExamQuestion: true,
      },
      select: {
        status: true,
        mockExamQuestion: {
          number: true,
          id: true,
        },
      },
      order: {
        mockExamQuestion: {
          number: 'ASC',
        },
      },
    });
    if (!mockExam) {
      return {
        ok: false,
        error: '존재하지 않는 시험입니다.',
      };
    }
    const questionNumbers: QuestionNumber[] = mockExam[0].mockExamQuestion.map(
      (data) => ({
        questionNumber: data.number,
        questionId: data.id,
      }),
    );
    return {
      ok: true,
      questionNumbers,
      examStatus: mockExam[0].status,
    };
  }
  /** deprecated */
  async readMockExamQuestionsByState(
    user: User,
    readMockExamQuestionsByStateInput: ReadMockExamQuestionsByStateInput,
  ): Promise<ReadMockExamQuestionsByStateOutput> {
    const { states, questionIds } = readMockExamQuestionsByStateInput;
    const where:
      | FindOptionsWhere<MockExamQuestionState>
      | FindOptionsWhere<MockExamQuestionState>[] = questionIds.map((id) => ({
      question: { id },
      user: {
        id: user.id,
      },
    }));
    const mockExamQusetionStates = await this.mockExamQuestionState.find({
      where,
      relations: {
        question: { state: true },
        exam: true,
      },
    });

    const mockExamQusetions = mockExamQusetionStates.filter((state) => {
      return states.includes(state.state);
    });

    mockExamQusetions.sort((a, b) => a.question.number - b.question.number);
    return {
      ok: true,
      mockExamQusetions,
    };
  }

  async updateLinkedQuestionIds(
    user: User,
    updateLinkedQuestionIdsInput: UpdateLinkedQuestionIdsInput,
  ): Promise<UpdateLinkedQuestionIdsOutput> {
    const { questionId, linkedQuestionIds } = updateLinkedQuestionIdsInput;
    const question = await this.mockExamQuestion.findOne({
      where: { id: questionId },
    });
    if (!question) {
      return {
        ok: false,
        error: '문제가 존재하지 않습니다.',
      };
    }
    question.linkedQuestionIds = linkedQuestionIds;
    const linkedQuestions = await this.mockExamQuestion.find({
      where: { id: In(linkedQuestionIds) },
    });
    linkedQuestions.forEach((question) => {
      question.linkedQuestionIds = Array.from(
        new Set([...question.linkedQuestionIds, questionId]),
      );
    });
    await this.mockExamQuestion.save([question, ...linkedQuestions]);
    return {
      ok: true,
    };
  }

  async sync() {
    try {
      const duplicateStates = await this.mockExamQuestionState
        .createQueryBuilder('state')
        .select('state.user.id', 'userId')
        .addSelect('state.question.id', 'questionId')
        .addSelect('COUNT(*)', 'count')
        .groupBy('state.userId')
        .addGroupBy('state.questionId')
        .having('COUNT(*) > 1')
        .getRawMany();
      if (duplicateStates.length > 0) {
        const detailedDuplicates = await this.mockExamQuestionState.find({
          where: duplicateStates.map((dup) => ({
            user: { id: dup.userId },
            question: { id: dup.questionId },
          })),
          relations: ['user', 'question'],
        });
        console.log(detailedDuplicates.length);
        console.log(duplicateStates[0]);
      }
      return {
        ok: true,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
      };
    }
  }

  async searchQuestionsByKeyword(
    user: User,
    searchQuestionsByKeywordInput: SearchQuestionsByKeywordInput,
  ): Promise<SearchQuestionsByKeywordOutput> {
    try {
      const { keyword, examIds, isAll } = searchQuestionsByKeywordInput;
      const formattedKeyword = `%${keyword.replace(/\s+/g, '').toLowerCase()}%`;
      let searchQuestionsByKeywordQuery = this.mockExamQuestion
        .createQueryBuilder('question')
        .leftJoinAndSelect('question.mockExam', 'mockExam')
        .leftJoinAndSelect('question.user', 'user');

      if (!user || user?.role !== UserRole.ADMIN || !isAll) {
        searchQuestionsByKeywordQuery
          .where(
            "(LOWER(REPLACE(question.question, ' ', '')) LIKE :formattedKeyword OR LOWER(REPLACE(question.solution, ' ', '')) LIKE :formattedKeyword)",
            { formattedKeyword },
          )
          .limit(30);
        if (examIds.length > 0) {
          searchQuestionsByKeywordQuery =
            searchQuestionsByKeywordQuery.andWhere(
              'mockExam.id IN (:...examIds)',
              { examIds },
            );
        }
      } else {
        searchQuestionsByKeywordQuery
          .where(
            "(LOWER(REPLACE(question.question, ' ', '')) LIKE :formattedKeyword OR LOWER(REPLACE(question.solution, ' ', '')) LIKE :formattedKeyword)",
            { formattedKeyword },
          )
          .limit(50);
      }

      let questions = await searchQuestionsByKeywordQuery.getMany();
      if (user) {
        const questionBookmarks = await this.mockExamQuestionBookmark.find({
          relations: { question: true, bookmarkFolder: true },
          where: {
            question: In(questions.map((question) => question.id)),
            user: {
              id: user.id,
            },
          },
        });
        questions = questions.map((question) => {
          const myBookmark = questionBookmarks.find(
            (bookmark) => bookmark.question.id === question.id,
          );
          if (myBookmark) {
            return {
              ...question,
              isBookmarked: true,
              myBookmark,
            };
          }
          return question;
        });
      }

      return {
        questions,
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '문제를 찾을 수 없습니다.',
      };
    }
  }

  async readQuestionsByExamIds(
    user: User,
    readQuestionsByExamIdsInput: ReadQuestionsByExamIdsInput,
  ): Promise<ReadQuestionsByExamIdsOutput> {
    try {
      const { order, states, ids, limit, bookmarked, highlighted, feedbacked } =
        readQuestionsByExamIdsInput;
      let mockExams = await this.mockExam.find({
        where: {
          id: In(ids),
        },
        relations: {
          user: true,
          mockExamQuestion: {
            user: true,
          },
        },
      });
      await Promise.all(
        mockExams.map(async (mockExam) => {
          const isPrivateCategory = await this.mockExamCategory.count({
            where: {
              isPublic: false,
              user: {
                id: mockExam.user.id,
              },
              source: ExamSource.USER,
              mockExam: {
                id: mockExam.id,
              },
            },
          });
          const category = await this.mockExamCategory.count({
            where: {
              mockExam: {
                id: mockExam.id,
              },
            },
          });
          mockExams = mockExams.map((mockExam) => ({
            ...mockExam,
            isPrivate: mockExam.approved ? false : true,
          }));
          if (isPrivateCategory || category === 0) {
            mockExams = mockExams.map((mockExam) => ({
              ...mockExam,
              isPrivate: true,
            }));
          }
        }),
      );
      let questions: MockExamQuestion[] = mockExams.flatMap(
        (mockExam) => mockExam.mockExamQuestion,
      );
      let questionIds = questions.map((question) => question.id);
      if (bookmarked) {
        const questionBookmarks = await this.mockExamQuestionBookmark.find({
          relations: {
            bookmarkFolder: true,
            question: {
              user: true,
            },
          },
          where: {
            ...(ids.length > 0 && {
              question: {
                id: In(questionIds),
              },
            }),
            user: {
              id: user.id,
            },
          },
        });
        questions = questionBookmarks.map((bookmark) => bookmark.question);
        questionIds = questions.map((question) => question.id);
      }
      if (highlighted && user) {
        const questionHighlights = await this.textHighlights.find({
          relations: {
            question: {
              user: true,
            },
          },
          where: {
            question: { id: In(questionIds) },
            user: {
              id: user.id,
            },
          },
        });
        questions = questionHighlights.map((highlight) => highlight.question);
        questionIds = questions.map((question) => question.id);
      }
      if (feedbacked && user) {
        const questionFeedbacks = await this.mockExamQuestionFeedback.find({
          relations: {
            mockExamQuestion: {
              user: true,
            },
          },
          where: {
            mockExamQuestion: {
              id: In(questionIds),
            },
            user: {
              id: user.id,
            },
          },
        });
        questions = questionFeedbacks.map(
          (feedback) => feedback.mockExamQuestion,
        );
        questionIds = questions.map((question) => question.id);
      }
      /**
       * Core상태는 저장되지 않기 때문에 따로 가져와야 한다.
       */
      if (user && states) {
        let coreQuestions: MockExamQuestion[] = [];
        if (states.includes(QuestionState.CORE)) {
          const [allQuestions, existingQuestionStates] = await Promise.all([
            this.mockExamQuestion
              .find({
                where: {
                  mockExam: {
                    id: In(ids),
                  },
                },
                relations: {
                  user: true,
                },
              })
              .then((res) => res),
            this.mockExamQuestionState
              .find({
                relations: {
                  question: {
                    user: true,
                  },
                  exam: true,
                },
                where: {
                  user: { id: user.id },
                  question: { id: In(questionIds) },
                },
              })
              .then((res) => res),
          ]);
          const existingQuestionStateMap = new Map(
            existingQuestionStates.map((qs) => [qs.question.id, qs]),
          );
          coreQuestions = allQuestions.filter(
            (question) => !existingQuestionStateMap.has(question.id),
          );
        }

        let questionStatesQuery = this.mockExamQuestionState
          .createQueryBuilder('mockExamQuestionState')
          .leftJoinAndSelect('mockExamQuestionState.question', 'question')
          .leftJoinAndSelect('question.user', 'user')
          .leftJoinAndSelect('question.mockExam', 'mockExam')
          .where('mockExamQuestionState.user.id = :id', { id: user.id })
          .andWhere('question.id = question.id')
          .andWhere('mockExamQuestionState.state IN (:...states)', {
            states,
          });

        if (ids.length > 0) {
          questionStatesQuery = questionStatesQuery.andWhere(
            'mockExam.id IN (:...ids)',
            {
              ids,
            },
          );
        }

        if (limit) {
          questionStatesQuery = questionStatesQuery.limit(limit);
        }
        const questionStates = await questionStatesQuery.getMany();

        questions = questionStates.map((state) => state.question);
        if (coreQuestions.length > 0) {
          questions = questions.concat(coreQuestions);
        }
      }
      if (order === 'random') {
        questions = shuffleArray(questions);
      }
      if (order === 'normal' && ids.length > 0) {
        questions = sortQuestions(
          questions,
          mockExams.flatMap((mockExam) => mockExam.questionOrderIds),
        );
      }
      if (limit) {
        questions = questions.slice(0, limit);
      }
      questionIds = questions.map((question) => question.id);
      const [
        questionHighlights,
        questionStates,
        questionBookmarks,
        questionFeedbacks,
      ] = await Promise.all([
        user
          ? this.textHighlights
              .find({
                relations: { question: true },
                where: {
                  question: In(questionIds),
                  user: {
                    id: user.id,
                  },
                },
              })
              .then((res) => res)
          : [],
        user
          ? this.mockExamQuestionState
              .find({
                relations: { question: true },
                where: {
                  question: In(questionIds),
                  user: {
                    id: user.id,
                  },
                },
                order: {
                  updated_at: 'DESC',
                },
              })
              .then((res) => res)
          : [],
        user
          ? this.mockExamQuestionBookmark
              .find({
                relations: { question: true, bookmarkFolder: true },
                where: {
                  question: In(questionIds),
                  user: {
                    id: user.id,
                  },
                },
              })
              .then((res) => res)
          : [],
        user
          ? this.mockExamQuestionFeedback
              .find({
                relations: {
                  mockExamQuestion: true,
                  user: true,
                  recommendation: { user: true },
                },
                where: [
                  {
                    mockExamQuestion: In(questionIds),
                    type: In([
                      QuestionFeedbackType.PUBLIC,
                      QuestionFeedbackType.REPORT,
                    ]),
                  },
                  {
                    mockExamQuestion: In(questionIds),
                    type: QuestionFeedbackType.PRIVATE,
                    user: {
                      id: user.id,
                    },
                  },
                ],
                order: {
                  type: 'ASC',
                },
              })
              .then((res) => res)
          : this.mockExamQuestionFeedback
              .find({
                relations: {
                  mockExamQuestion: true,
                  user: true,
                  recommendation: { user: true },
                },
                where: {
                  mockExamQuestion: In(questionIds),
                  type: In([
                    QuestionFeedbackType.PUBLIC,
                    QuestionFeedbackType.REPORT,
                  ]),
                },
                order: {
                  type: 'ASC',
                },
              })
              .then((res) => res),
      ]);
      questions = questions.map((question) => {
        return {
          ...question,
          mockExam: mockExams.find((mockExam) =>
            mockExam.mockExamQuestion.find((q) => q.id === question.id),
          ),
          textHighlight: questionHighlights.filter(
            (highlight) => highlight.question.id === question.id,
          ),
          myQuestionState: questionStates.find(
            (state) => state.question.id === question.id,
          )?.state,
          isBookmarked: !!questionBookmarks.find(
            (bookmark) => bookmark.question.id === question.id,
          ),
          myBookmark: questionBookmarks.find(
            (bookmark) => bookmark.question.id === question.id,
          ),
          mockExamQuestionFeedback: questionFeedbacks
            .filter(
              (feedback) =>
                feedback.mockExamQuestion.id === question.id &&
                (feedback.type !== QuestionFeedbackType.PRIVATE ||
                  (feedback.type === QuestionFeedbackType.PRIVATE &&
                    (feedback.user?.id === user?.id ||
                      user?.role === UserRole.ADMIN))),
            )
            .map((feedback) => {
              const goodCount = feedback.recommendation.filter(
                (recommendation) =>
                  recommendation.type ===
                  QuestionFeedbackRecommendationType.GOOD,
              ).length;
              const badCount = feedback.recommendation.filter(
                (recommendation) =>
                  recommendation.type ===
                  QuestionFeedbackRecommendationType.BAD,
              ).length;
              const myRecommedationStatus: MyRecommedationStatus = {
                isGood: false,
                isBad: false,
              };
              feedback.recommendation.forEach((recommendation) => {
                if (recommendation.user?.id === user?.id) {
                  if (
                    recommendation.type ===
                    QuestionFeedbackRecommendationType.GOOD
                  ) {
                    myRecommedationStatus.isGood = true;
                  }
                  if (
                    recommendation.type ===
                    QuestionFeedbackRecommendationType.BAD
                  ) {
                    myRecommedationStatus.isBad = true;
                  }
                }
              });
              const recommendationCount: RecommendationCount = {
                good: goodCount,
                bad: badCount,
              };
              return {
                ...feedback,
                recommendationCount,
                myRecommedationStatus,
              };
            })
            .sort((a, b) =>
              a.type === QuestionFeedbackType.PRIVATE
                ? -1
                : b.recommendationCount.good - a.recommendationCount.good ||
                  a.recommendationCount.bad - b.recommendationCount.bad,
            ),
        };
      });
      return {
        ok: true,
        questions,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: '문제를 찾을 수 없습니다.',
      };
    }
  }

  async readBookmarkedQuestions(
    user: User,
    readBookmarkedQuestionsInput: ReadBookmarkedQuestionsInput,
  ): Promise<ReadBookmarkedQuestionsOutput> {
    try {
      const { folderId, limit, order } = readBookmarkedQuestionsInput;
      let bookmarks = await this.mockExamQuestionBookmark.find({
        relations: {
          question: {
            user: true,
          },
        },
        where: {
          bookmarkFolder: folderId
            ? {
                id: folderId,
              }
            : IsNull(),
          user: {
            id: user.id,
          },
        },
        ...(limit && { limit }),
      });
      if (order === 'random') {
        bookmarks = shuffleArray(bookmarks);
      }

      let questions = bookmarks.map((bookmark) => bookmark.question);
      const questionIds = questions.map((question) => question.id);
      const mockExams = await this.mockExam.find({
        where: {
          mockExamQuestion: {
            id: In(questionIds),
          },
        },
        relations: {
          mockExamQuestion: true,
        },
      });
      const [
        questionHighlights,
        questionStates,
        questionBookmarks,
        questionFeedbacks,
      ] = await Promise.all([
        user
          ? this.textHighlights.find({
              relations: { question: true },
              where: {
                question: In(questionIds),
                user: {
                  id: user.id,
                },
              },
            })
          : [],
        user
          ? this.mockExamQuestionState.find({
              relations: { question: true },
              where: {
                question: In(questionIds),
                user: {
                  id: user.id,
                },
              },
              order: {
                updated_at: 'DESC',
              },
            })
          : [],
        user
          ? this.mockExamQuestionBookmark.find({
              relations: { question: true, bookmarkFolder: true },
              where: {
                question: In(questionIds),
                user: {
                  id: user.id,
                },
              },
            })
          : [],
        user
          ? this.mockExamQuestionFeedback.find({
              relations: {
                mockExamQuestion: true,
                user: true,
                recommendation: { user: true },
              },
              where: [
                {
                  mockExamQuestion: In(questionIds),
                  type: In([
                    QuestionFeedbackType.PUBLIC,
                    QuestionFeedbackType.REPORT,
                  ]),
                },
                {
                  mockExamQuestion: In(questionIds),
                  type: QuestionFeedbackType.PRIVATE,
                  user: {
                    id: user.id,
                  },
                },
              ],
              order: {
                type: 'ASC',
              },
            })
          : this.mockExamQuestionFeedback.find({
              relations: {
                mockExamQuestion: true,
                user: true,
                recommendation: { user: true },
              },
              where: {
                mockExamQuestion: In(questionIds),
                type: In([
                  QuestionFeedbackType.PUBLIC,
                  QuestionFeedbackType.REPORT,
                ]),
              },
              order: {
                type: 'ASC',
              },
            }),
      ]);
      questions = questions.map((question) => {
        return {
          ...question,
          textHighlight: questionHighlights.filter(
            (highlight) => highlight.question.id === question.id,
          ),
          mockExam: mockExams.find((mockExam) =>
            mockExam.mockExamQuestion.find((q) => q.id === question.id),
          ),
          myQuestionState: questionStates.find(
            (state) => state.question.id === question.id,
          )?.state,
          isBookmarked: !!questionBookmarks.find(
            (bookmark) => bookmark.question.id === question.id,
          ),
          myBookmark: questionBookmarks.find(
            (bookmark) => bookmark.question.id === question.id,
          ),
          mockExamQuestionFeedback: questionFeedbacks
            .filter(
              (feedback) =>
                feedback.mockExamQuestion.id === question.id &&
                (feedback.type !== QuestionFeedbackType.PRIVATE ||
                  (feedback.type === QuestionFeedbackType.PRIVATE &&
                    (feedback.user?.id === user?.id ||
                      user?.role === UserRole.ADMIN))),
            )
            .map((feedback) => {
              const goodCount = feedback.recommendation.filter(
                (recommendation) =>
                  recommendation.type ===
                  QuestionFeedbackRecommendationType.GOOD,
              ).length;
              const badCount = feedback.recommendation.filter(
                (recommendation) =>
                  recommendation.type ===
                  QuestionFeedbackRecommendationType.BAD,
              ).length;
              const myRecommedationStatus: MyRecommedationStatus = {
                isGood: false,
                isBad: false,
              };
              feedback.recommendation.forEach((recommendation) => {
                if (recommendation.user?.id === user?.id) {
                  if (
                    recommendation.type ===
                    QuestionFeedbackRecommendationType.GOOD
                  ) {
                    myRecommedationStatus.isGood = true;
                  }
                  if (
                    recommendation.type ===
                    QuestionFeedbackRecommendationType.BAD
                  ) {
                    myRecommedationStatus.isBad = true;
                  }
                }
              });
              const recommendationCount: RecommendationCount = {
                good: goodCount,
                bad: badCount,
              };
              return {
                ...feedback,
                recommendationCount,
                myRecommedationStatus,
              };
            })
            .sort((a, b) =>
              a.type === QuestionFeedbackType.PRIVATE
                ? -1
                : b.recommendationCount.good - a.recommendationCount.good ||
                  a.recommendationCount.bad - b.recommendationCount.bad,
            ),
        };
      });
      return {
        ok: true,
        questions,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: '문제를 찾을 수 없습니다.',
      };
    }
  }
}
