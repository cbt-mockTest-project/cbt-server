/* eslint-disable prefer-const */
import { MockExamQuestionComment } from './entities/mock-exam-question-comment.entity';
import { MockExamQuestionFeedback } from './entities/mock-exam-question-feedback.entity';
import { MockExamQuestionBookmark } from 'src/mock-exams/entities/mock-exam-question-bookmark.entity';
import {
  ReadMockExamQuestionsByMockExamIdInput,
  ReadMockExamQuestionsByMockExamIdOutput,
} from './dtos/readMockExamQuestionsByMockExamId.dto';
import {
  ReadMockExamQuestionInput,
  ReadMockExamQuestionOutput,
} from './dtos/readMockExamQuestion.dto';
import {
  UpdateApprovedStateOfMockExamQuestionInput,
  UpdateApprovedStateOfMockExamQuestionOutput,
} from './dtos/updateApprovedStateOfMockExamQuestion.dto';
import {
  MockExamQuestionState,
  QuestionState,
} from './entities/mock-exam-question-state.entity';
import { ReadAllMockExamQuestionOutput } from './dtos/readAllMockExamQuestion.dto';
import {
  EditMockExamQuestionInput,
  EditMockExamQuestionOutput,
} from './dtos/editMockExamQuestion.dto';
import { MockExam } from './entities/mock-exam.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, In, Not } from 'typeorm';
import {
  CreateMockExamQuestionInput,
  CreateMockExamQuestionOutput,
} from './dtos/createMockExamQuestion.dto';
import { MockExamQuestion } from './entities/mock-exam-question.entity';
import {
  DeleteMockExamQuestionInput,
  DeleteMockExamQuestionOutput,
} from './dtos/deleteMockExamQuestion.dto';
import { User } from 'src/users/entities/user.entity';
import {
  ReadMockExamQuestionsByStateInput,
  ReadMockExamQuestionsByStateOutput,
} from './dtos/readMockExamQuestionsByState.dto';
import {
  QuestionNumber,
  ReadMockExamQuestionNumbersInput,
  ReadMockExamQuestionNumbersOutput,
} from './dtos/readMockExamQuestionNumbers.dto';
import { ReadAllQuestionsOutput } from './dtos/readAllQuestions.dto';

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
          mockExamQuestionFeedback: { user: true },
          user: true,
        },
      });
      if (!question) {
        return {
          ok: false,
          error: '존재하지 않는 문제입니다.',
        };
      }
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
        relations: { user: true },
      });
      if (!prevMockExamQuestion) {
        return {
          ok: false,
          error: '존재하지 않는 문제입니다.',
        };
      }
      if (prevMockExamQuestion.user.id !== user.id) {
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
        relations: { user: true },
      });
      if (!mockExamQuestion) {
        return {
          ok: false,
          error: '존재하지 않는 문제입니다.',
        };
      }
      if (user.id !== mockExamQuestion.user.id) {
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
      const { id, bookmarked, ids, states } =
        readMockExamQuestionsByMockExamIdInput;
      let questionStates: MockExamQuestionState[] = [];
      let questionBookmarks: MockExamQuestionBookmark[] = [];
      let questionFeedbacks: MockExamQuestionFeedback[] = [];
      let questionComments: MockExamQuestionComment[] = [];

      const makeQuestionJoins = async (questions: MockExamQuestion[]) => {
        const questionIds = questions.map((question) => question.id);
        await Promise.all([
          (questionStates = await this.mockExamQuestionState.find({
            relations: { question: true, user: true, exam: true },
            where: {
              question: In(questionIds),
            },
          })),
          (questionBookmarks = await this.mockExamQuestionBookmark.find({
            relations: { question: true, user: true },
            where: {
              question: In(questionIds),
            },
          })),
          (questionFeedbacks = await this.mockExamQuestionFeedback.find({
            relations: { mockExamQuestion: true, user: true },
            where: {
              mockExamQuestion: In(questionIds),
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
            mockExamQuestionFeedback: questionFeedbacks.filter(
              (feedback) => feedback.mockExamQuestion.id === question.id,
            ),
            mockExamQuestionBookmark: questionBookmarks.filter(
              (bookmark) => bookmark.question.id === question.id,
            ),
            mockExamQuestionComment: questionComments.filter(
              (comment) => comment.question.id === question.id,
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
        let questions: MockExamQuestion[] = await this.mockExamQuestion
          .createQueryBuilder('mockExamQuestion')
          .leftJoinAndSelect('mockExamQuestion.mockExam', 'mockExam')
          .limit(14)
          .orWhere('mockExamQuestion.mockExam.id IN (:...ids)', { ids })
          .orderBy('RANDOM()')
          .getMany();
        questions = questions.slice(0, 14);
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
