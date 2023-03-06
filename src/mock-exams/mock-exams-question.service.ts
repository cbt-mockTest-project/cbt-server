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
import { MockExamQuestionState } from './entities/mock-exam-question-state.entity';
import { ReadAllMockExamQuestionOutput } from './dtos/readAllMockExamQuestion.dto';
import {
  EditMockExamQuestionInput,
  EditMockExamQuestionOutput,
} from './dtos/editMockExamQuestion.dto';
import { MockExam } from './entities/mock-exam.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
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
  ReadMockExamQuestionNumbersInput,
  ReadMockExamQuestionNumbersOutput,
} from './dtos/readMockExamQuestionNumbers.dto';
import { shuffleArray } from 'src/utils/utils';
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
  ) {}

  async createMockExamQuestion(
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
    editMockExamQuestionInput: EditMockExamQuestionInput,
  ): Promise<EditMockExamQuestionOutput> {
    try {
      const { id, question, question_img, solution, solution_img } =
        editMockExamQuestionInput;
      const prevMockExamQuestion = await this.mockExamQuestion.findOne({
        where: { id },
      });
      if (!prevMockExamQuestion) {
        return {
          ok: false,
          error: '존재하지 않는 문제입니다.',
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
    deleteMockExamQuestionInput: DeleteMockExamQuestionInput,
  ): Promise<DeleteMockExamQuestionOutput> {
    try {
      const { id } = deleteMockExamQuestionInput;
      const mockExamQuestion = await this.mockExamQuestion.findOne({
        where: { id },
      });
      if (!mockExamQuestion) {
        return {
          ok: false,
          error: '존재하지 않는 문제입니다.',
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
      const { id, isRandom, bookmarked } =
        readMockExamQuestionsByMockExamIdInput;

      // 북마크된 게시물 전체
      if (!id && bookmarked && user) {
        const [questions, count] = await this.mockExamQuestion.findAndCount({
          order: { number: 'ASC' },
          relations: {
            state: { user: true, exam: true },
            mockExamQuestionBookmark: { user: true },
            mockExamQuestionComment: { user: true },
          },
          where: {
            mockExamQuestionBookmark: { user: { id: user.id } },
          },
        });
        return {
          ok: true,
          title: '전체',
          questions,
          count,
        };
      }

      const mockExam = await this.mockExam.findOne({ where: { id } });
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
      // eslint-disable-next-line prefer-const
      let [questions, count] = await this.mockExamQuestion.findAndCount({
        order: { number: 'ASC' },
        relations: {
          state: { user: true, exam: true },
          mockExamQuestionBookmark: { user: true },
          mockExamQuestionComment: { user: true },
        },
        where,
      });
      if (!user) {
        questions = questions.map((question) => ({
          ...question,
          mockExamQuestionBookmark: [],
        }));
      }
      if (user) {
        questions = questions.map((question) => {
          const filteredState = question.state.filter(
            (state) => user && state.user.id === user.id,
          );
          const filteredBookmark = question.mockExamQuestionBookmark.filter(
            (bookmark) => user && bookmark.user.id === user.id,
          );
          return {
            ...question,
            state: filteredState,
            mockExamQuestionBookmark: filteredBookmark,
          };
        });
        if (isRandom) {
          questions = shuffleArray(questions);
        }
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
        questions,
        count,
      };
    } catch {
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
        mockExamQuestion: {
          number: true,
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
    const questionNumbers = mockExam[0].mockExamQuestion.map(
      (data) => data.number,
    );
    return {
      ok: true,
      questionNumbers,
    };
  }

  async readMockExamQuestionsByState(
    user: User,
    readMockExamQuestionsByStateInput: ReadMockExamQuestionsByStateInput,
  ): Promise<ReadMockExamQuestionsByStateOutput> {
    const { states, examId } = readMockExamQuestionsByStateInput;
    const commonAndConditions = {
      user: {
        id: user.id,
      },
      question: {
        mockExam: { id: examId },
      },
    };
    const where = states.map((state) => ({ ...commonAndConditions, state }));
    const mockExamQuestionStates = await this.mockExamQuestionState.find({
      where,
      relations: {
        question: {
          state: true,
        },
      },
      select: ['question'],
    });
    const mockExamQusetions = mockExamQuestionStates
      .map((state) => state.question)
      .sort((a, b) => a.number - b.number);
    return {
      ok: true,
      mockExamQusetions,
    };
  }
}
