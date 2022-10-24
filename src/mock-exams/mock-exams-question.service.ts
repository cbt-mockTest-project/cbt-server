import { MockExamQuestionState } from './entities/mock-exam-question-state.entity';
import { ReadAllMockExamQuestionOutput } from './dtos/readAllMockExamQuestion.dto';
import {
  EditMockExamQuestionInput,
  EditMockExamQuestionOutput,
} from './dtos/editMockExamQuestion.dto';
import { MockExam } from './entities/mock-exam.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateMockExamQuestionInput,
  CreateMockExamQuestionOutput,
} from './dtos/createMockExamQuestion.dto';
import { MockExamQuestion } from './entities/mock-exam-question.entity';
import {
  DeleteMockExamQuestionInput,
  DeleteMockExamQuestionOutput,
} from './dtos/deleteMockExamQuestion.dto';
import {
  CreateOrUpdateMockExamQuestionStateInput,
  CreateOrUpdateMockExamQuestionStateOutput,
} from './dtos/createOrUpdateMockExamQuestionState.dto';
import { User } from 'src/users/entities/user.entity';
import {
  ReadMockExamQuestionsByStateInput,
  ReadMockExamQuestionsByStateOutput,
} from './dtos/readMockExamQuestionsByState.dto';

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
      const { question, question_img, solution, solution_img, mockExamTitle } =
        createMockExamQuestionInput;
      const mockExam = await this.mockExam.findOne({
        where: { title: mockExamTitle },
      });
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
      });
      await this.mockExamQuestion.save(newExamQuestion);
      return { ok: true };
    } catch {
      return { ok: false, error: '문제를 만들 수 없습니다' };
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
    } catch (e) {
      console.log(e);
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

  async readAllMockExamQuestion(): Promise<ReadAllMockExamQuestionOutput> {
    try {
      const mockExamQuestions = await this.mockExamQuestion.find({
        relations: ['mockExamQuestionFeedback'],
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

  async readMockExamQuestionsByState(
    user: User,
    readMockExamQuestionsByStateInput: ReadMockExamQuestionsByStateInput,
  ): Promise<ReadMockExamQuestionsByStateOutput> {
    const { state, examId } = readMockExamQuestionsByStateInput;
    const mockExamQuestionStates = await this.mockExamQuestionState.find({
      where: {
        user: {
          id: user.id,
        },
        state,
      },
      relations: ['mockExamQuestion'],
      select: ['mockExamQuestion'],
    });
    const mockExamQuestionsByState = mockExamQuestionStates
      .map((data) => data.mockExamQuestion)
      .filter((mockExamQuestion) => mockExamQuestion.mockExamId === examId);
    return {
      ok: true,
      mockExamQusetions: mockExamQuestionsByState,
    };
  }

  async createOrUpdateMockExamQuestionState(
    user: User,
    createOrUpdateMockExamQuestionStateInput: CreateOrUpdateMockExamQuestionStateInput,
  ): Promise<CreateOrUpdateMockExamQuestionStateOutput> {
    const { questionId, state } = createOrUpdateMockExamQuestionStateInput;
    const prevState = await this.mockExamQuestionState.findOne({
      where: {
        user: {
          id: user.id,
        },
        mockExamQuestion: {
          id: questionId,
        },
      },
    });
    if (prevState) {
      if (prevState.state === state) {
        return {
          ok: false,
          error: '이전과 값이 동일합니다.',
        };
      }
      await this.mockExamQuestionState.update(prevState.id, { state });
      return {
        ok: true,
        message: 'update success',
      };
    }
    const mockExamQuestion = await this.mockExamQuestion.findOne({
      where: {
        id: questionId,
      },
    });
    if (!mockExamQuestion) {
      return {
        ok: false,
        error: '존재하지 않는 문제입니다.',
      };
    }
    const newState = this.mockExamQuestionState.create({
      mockExamQuestion,
      state,
      user,
    });
    await this.mockExamQuestionState.save(newState);
    return {
      ok: true,
      message: 'create success',
    };
  }
}
