import { ExamCoAuthor } from './../exam-co-author/entities/exam-co-author.entity';
/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MockExamQuestionBookmark } from 'src/mock-exams/entities/mock-exam-question-bookmark.entity';
import { User } from 'src/users/entities/user.entity';
import { shuffleArray } from 'src/utils/utils';
import { FindOptionsWhere, In, Not, Repository } from 'typeorm';
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
import { ReadAllQuestionsOutput } from './dtos/readAllQuestions.dto';
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

@Injectable()
export class MockExamQuestionService {
  constructor(
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
          mockExam: true,
          mockExamQuestionComment: { user: true },
          mockExamQuestionBookmark: user ? { user: true } : false,
          mockExamQuestionFeedback: {
            user: true,
            recommendation: { user: true },
            mockExamQuestion: true,
          },
          user: true,
        },
        order: {
          mockExamQuestionFeedback: {
            type: 'ASC',
          },
        },
      });
      let isCoAuthor = false;
      if (user) {
        const examCoAuthor = await this.examCoAuthor.findOne({
          where: {
            exam: {
              id: question.mockExam.id,
            },
            user: {
              id: user && user.id,
            },
          },
        });
        if (examCoAuthor) {
          isCoAuthor = true;
        }
      }
      if (!question) {
        return {
          ok: false,
          error: '존재하지 않는 문제입니다.',
        };
      }
      question.mockExamQuestionFeedback = question.mockExamQuestionFeedback
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
              recommendation.type === QuestionFeedbackRecommendationType.GOOD,
          ).length;
          const badCount = feedback.recommendation.filter(
            (recommendation) =>
              recommendation.type === QuestionFeedbackRecommendationType.BAD,
          ).length;
          const myRecommedationStatus: MyRecommedationStatus = {
            isGood: false,
            isBad: false,
          };
          feedback.recommendation.forEach((recommendation) => {
            if (recommendation.user.id === user?.id) {
              if (
                recommendation.type === QuestionFeedbackRecommendationType.GOOD
              ) {
                myRecommedationStatus.isGood = true;
              }
              if (
                recommendation.type === QuestionFeedbackRecommendationType.BAD
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
        );

      if (user) {
        const mockExamQuestionBookmark =
          question.mockExamQuestionBookmark.filter(
            (bookmark) => user.id === bookmark.user.id,
          );
        question = { ...question, mockExamQuestionBookmark };
      } else {
        question = { ...question, mockExamQuestionBookmark: [] };
      }
      return {
        ok: true,
        mockExamQusetion: question,
        isCoAuthor,
      };
    } catch (e) {
      console.log(e);
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
      const { id, question, question_img, solution, solution_img } =
        editMockExamQuestionInput;
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
      const coAuthor = await this.examCoAuthor.findOne({
        where: {
          user: {
            id: user.id,
          },
          exam: {
            id: prevMockExamQuestion.mockExam.id,
          },
        },
      });
      const isCoAuthor = coAuthor ? true : false;
      const isOwner = prevMockExamQuestion.user.id === user.id || isCoAuthor;
      if (!isOwner) {
        return {
          ok: false,
          error: '권한이 없습니다.',
        };
      }
      await this.mockExamQuestion.update(id, {
        question,
        question_img,
        solution,
        solution_img,
      });
      return {
        ok: true,
      };
    } catch {
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
  async readAllQuestions(): Promise<ReadAllQuestionsOutput> {
    try {
      const questions = await this.mockExamQuestion.find({
        relations: {
          mockExamQuestionComment: true,
        },
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
                  if (recommendation.user.id === user?.id) {
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
        console.time('랜덤모의고사');
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
          console.timeEnd('랜덤모의고사');
          return {
            ok: true,
            questions,
            title: '랜덤모의고사',
            count: questions.length,
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

  // async updateQuestionUserId() {
  //   const questions = await this.mockExamQuestion.find();
  //   await Promise.all(
  //     questions.map(async (question) => {
  //       await this.mockExamQuestion.save({ ...question, user: { id: 1 } });
  //     }),
  //   );
  //   return {
  //     ok: true,
  //   };
  // }
}
