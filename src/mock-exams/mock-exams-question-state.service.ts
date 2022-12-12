import { User } from 'src/users/entities/user.entity';
import {
  CreateOrUpdateMockExamQuestionStateInput,
  CreateOrUpdateMockExamQuestionStateOutput,
} from './dtos/createOrUpdateMockExamQuestionState.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MockExamQuestionState } from './entities/mock-exam-question-state.entity';
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
    });
    if (!question) {
      return {
        ok: false,
        error: '존재하지 않는 문제입니다.',
      };
    }
    const newState = this.mockExamQuestionState.create({
      question,
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
}
