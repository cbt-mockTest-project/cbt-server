import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from 'src/users/entities/user.entity';
import { deduplication } from 'src/utils/utils';
import { FindOptionsWhere, In, Not, Repository } from 'typeorm';
import {
  CreateOrUpdateMockExamQuestionStateInput,
  CreateOrUpdateMockExamQuestionStateOutput,
} from './dtos/createOrUpdateMockExamQuestionState.dto';
import { ReadExamTitleAndIdByQuestionStateOutput } from './dtos/readExamTitleAndIdByQuestionState.dto';
import {
  ReadMyExamQuestionStateInput,
  ReadMyExamQuestionStateOutput,
} from './dtos/readMyExamQuestionStates.dto';
import {
  ResetMyExamQuestionStateInput,
  ResetMyExamQuestionStateOutput,
} from './dtos/resetMyExamQuestionState.dto';
import {
  MockExamQuestionState,
  QuestionState,
} from './entities/mock-exam-question-state.entity';
import { MockExamQuestion } from './entities/mock-exam-question.entity';

@Injectable()
export class MockExamQuestionStateService {
  constructor(
    @InjectRepository(MockExamQuestionState)
    private readonly mockExamQuestionState: Repository<MockExamQuestionState>,
    @InjectRepository(MockExamQuestion)
    private readonly mockExamQuestion: Repository<MockExamQuestion>,
  ) {}

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
        question: {
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
        currentState: state,
      };
    }
    const question = await this.mockExamQuestion.findOne({
      where: {
        id: questionId,
      },
      relations: {
        mockExam: true,
      },
    });
    if (!question) {
      return {
        ok: false,
        error: '존재하지 않는 문제입니다.',
      };
    }
    const newState = this.mockExamQuestionState.create({
      question,
      exam: question.mockExam,
      state,
      user,
    });
    await this.mockExamQuestionState.save(newState);
    return {
      ok: true,
      message: 'create success',
      currentState: state,
    };
  }

  async readMyExamQuestionState(
    readMyExamQuestionState: ReadMyExamQuestionStateInput,
    user: User,
  ): Promise<ReadMyExamQuestionStateOutput> {
    try {
      const { questionId } = readMyExamQuestionState;
      const coreState = this.mockExamQuestionState.create({
        state: QuestionState.CORE,
      });
      if (!user) {
        return {
          ok: true,
          state: coreState,
        };
      }
      const state = await this.mockExamQuestionState.findOne({
        where: {
          question: { id: questionId },
          user: { id: user.id },
        },
      });
      if (!state) {
        return {
          ok: true,
          state: coreState,
        };
      }
      return {
        ok: true,
        state: state,
      };
    } catch {
      return {
        ok: false,
        error: '상태를 읽어올 수 없습니다.',
      };
    }
  }

  async resetMyExamQuestionState(
    resetMyExamQuestionStateInput: ResetMyExamQuestionStateInput,
    user: User,
  ): Promise<ResetMyExamQuestionStateOutput> {
    try {
      const { examId, questionIds } = resetMyExamQuestionStateInput;
      let states: MockExamQuestionState[];
      if (questionIds) {
        const where:
          | FindOptionsWhere<MockExamQuestionState>
          | FindOptionsWhere<MockExamQuestionState>[] = questionIds.map(
          (id) => ({ question: { id }, user: { id: user.id } }),
        );
        states = await this.mockExamQuestionState.find({
          where,
        });
      } else if (examId) {
        states = await this.mockExamQuestionState.find({
          where: {
            user: { id: user.id },
            exam: { id: examId },
          },
        });
      }

      if (!states) {
        return {
          ok: false,
          error: '존재하지 않는 시험입니다.',
        };
      }
      if (states.length === 0) {
        return {
          ok: false,
          error: '체크된 성취도가 없습니다.',
        };
      }
      const newStates = this.mockExamQuestionState.create(
        states.map((el) => ({
          ...el,
          state: QuestionState.CORE,
        })),
      );
      await this.mockExamQuestionState.save(newStates);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '성취도를 초기화 할 수 없습니다.',
      };
    }
  }

  async readExamTitleAndIdByQuestionState(
    user: User,
  ): Promise<ReadExamTitleAndIdByQuestionStateOutput> {
    try {
      const questionStates = await this.mockExamQuestionState.find({
        where: {
          state: Not(QuestionState.CORE),
          user: {
            id: user.id,
          },
        },
        relations: {
          exam: true,
        },
      });
      const titleAndId = deduplication(
        questionStates.map((state) => {
          const { title, id } = state.exam;
          return { title, id };
        }),
      );
      return { ok: true, titleAndId };
    } catch (e) {
      return { ok: false, error: '시험카테고리를 불러올 수 없습니다.' };
    }
  }

  // 안푼 문제들을 전부 Core상태로 바꿔주는 로직
  async updateQuestionStatesToCore(user: User): Promise<CoreOutput> {
    const questions = await this.mockExamQuestion.find();
    const questionIds = questions.map((q) => q.id);
    const existingQuestionStates = await this.mockExamQuestionState.find({
      relations: { question: true, exam: true },
      where: {
        user: { id: user.id },
        question: { id: In(questionIds) },
      },
    });

    const existingQuestionStateMap = new Map(
      existingQuestionStates.map((qs) => [qs.question.id, qs]),
    );

    const newQuestionStates = questions
      .filter((question) => !existingQuestionStateMap.has(question.id))
      .map((question) => {
        return this.mockExamQuestionState.create({
          question,
          exam: question.mockExam,
          state: QuestionState.CORE,
          user,
        });
      });

    if (newQuestionStates.length > 0) {
      await this.mockExamQuestionState.save(newQuestionStates);
    }
    return {
      ok: true,
    };
  }
}
