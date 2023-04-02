import { User, UserRole } from 'src/users/entities/user.entity';
import { ReadAllMockExamQuestionFeedbackOutput } from './dtos/readAllMockExamQuestionFeedback.dto';
import {
  EditMockExamQuestionFeedbackInput,
  EditMockExamQuestionFeedbackOutput,
} from './dtos/editMockExamQuestionFeedback.dto';
import {
  CreateMockExamQuestionFeedbackInput,
  CreateMockExamQuestionFeedbackOutput,
} from './dtos/createMockExamQuestionFeedback.dto';
import { MockExamQuestion } from './entities/mock-exam-question.entity';
import { MockExamQuestionFeedback } from './entities/mock-exam-question-feedback.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  DeleteMockExamQuestionFeedbackInput,
  DeleteMockExamQuestionFeedbackOutput,
} from './dtos/deleteMockExamQuestionFeedback.dto';

@Injectable()
export class MockExamQuestionFeedbackSerivce {
  constructor(
    @InjectRepository(MockExamQuestionFeedback)
    private readonly mockExamQuestionFeedback: Repository<MockExamQuestionFeedback>,
    @InjectRepository(MockExamQuestion)
    private readonly mockExamQuestion: Repository<MockExamQuestion>,
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  async createMockExamQuestionFeedback(
    createMockExamQuestionFeedbackInput: CreateMockExamQuestionFeedbackInput,
    user: User,
  ): Promise<CreateMockExamQuestionFeedbackOutput> {
    try {
      const { questionId, content, type } = createMockExamQuestionFeedbackInput;

      const question = await this.mockExamQuestion.findOne({
        where: { id: questionId },
      });
      if (!question) {
        return {
          ok: false,
          error: '존재하지 않는 문제입니다.',
        };
      }
      let feedback = this.mockExamQuestionFeedback.create({
        content,
        type,
        mockExamQuestion: question,
        user,
      });
      feedback = await this.mockExamQuestionFeedback.save(feedback);
      return {
        ok: true,
        feedback,
      };
    } catch {
      return {
        ok: false,
        error: '피드백을 보낼 수 없습니다.',
      };
    }
  }

  async editMockExamQuestionFeedback(
    editMockExamQuestionFeedbackInput: EditMockExamQuestionFeedbackInput,
  ): Promise<EditMockExamQuestionFeedbackOutput> {
    try {
      const { id, content } = editMockExamQuestionFeedbackInput;
      const prevFeedback = await this.mockExamQuestionFeedback.findOne({
        where: { id },
      });
      if (!prevFeedback) {
        return {
          ok: false,
          error: '존재하지 않는 피드백입니다.',
        };
      }
      prevFeedback.content = content;
      await this.mockExamQuestionFeedback.save([prevFeedback]);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '피드백을 수정 할 수 없습니다.',
      };
    }
  }

  async deleteMockExamQuestionFeedback(
    user: User,
    deleteMockExamQuestionFeedbackInput: DeleteMockExamQuestionFeedbackInput,
  ): Promise<DeleteMockExamQuestionFeedbackOutput> {
    try {
      const { id } = deleteMockExamQuestionFeedbackInput;
      const feedback = await this.mockExamQuestionFeedback.findOne({
        where: { id },
        relations: { user: true },
      });
      // 자신의 글이 아니면 삭제불가, 롤이 어드민이면 무조건 삭제가능
      if (feedback.user.id !== user.id && user.role !== UserRole.ADMIN) {
        return { ok: false, error: '권한이 없습니다.' };
      }
      if (!feedback) {
        return {
          ok: false,
          error: '존재하지 않는 피드백입니다.',
        };
      }
      this.mockExamQuestionFeedback.delete({ id });
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '피드백을 삭제 할 수 없습니다.',
      };
    }
  }

  async readAllMockExamQuestionFeedback(): Promise<ReadAllMockExamQuestionFeedbackOutput> {
    try {
      const feedbacks = await this.mockExamQuestionFeedback.find();
      return {
        ok: true,
        feedbacks,
      };
    } catch {
      return {
        ok: false,
        error: '피드백을 찾을 수 없습니다.',
      };
    }
  }
}
