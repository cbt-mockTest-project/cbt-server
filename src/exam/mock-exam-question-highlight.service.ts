import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MockExamQuestionHighlight } from './entities/mock-exam-question-highlight.entity';
import { Repository } from 'typeorm';
import { MockExamQuestion } from './entities/mock-exam-question.entity';
import { User } from 'src/users/entities/user.entity';
import {
  InsertQuestionHighlightInput,
  InsertQuestionHighlightOutput,
} from './dtos/insertQuestionHighlight.dto';
import {
  DeleteQuestionHighlightInput,
  DeleteQuestionHighlightOutput,
} from './dtos/deleteQuestionHighlight.dto';

@Injectable()
export class MockExamQuestionHighlightService {
  constructor(
    @InjectRepository(MockExamQuestionHighlight)
    private readonly mockExamQuestionHighlight: Repository<MockExamQuestionHighlight>,
    @InjectRepository(MockExamQuestion)
    private readonly mockExamQuestion: Repository<MockExamQuestion>,
    @InjectRepository(User) private readonly user: Repository<User>,
  ) {}

  async insertQuestionHighlight(
    user: User,
    insertQuestionHighlightInput: InsertQuestionHighlightInput,
  ): Promise<InsertQuestionHighlightOutput> {
    try {
      const { questionHtml, solutionHtml, questionId } =
        insertQuestionHighlightInput;
      const question = await this.mockExamQuestion.findOne({
        where: { id: questionId },
      });
      if (!question) {
        return { ok: false, error: '존재하지 않는 문제입니다.' };
      }
      const prevHighlight = await this.mockExamQuestionHighlight.findOne({
        where: {
          question: {
            id: questionId,
          },
          user: {
            id: user.id,
          },
        },
      });
      if (prevHighlight) {
        if (!questionHtml && !solutionHtml) {
          await this.mockExamQuestionHighlight.delete(prevHighlight.id);
          return { ok: true };
        }
        await this.mockExamQuestionHighlight.update(prevHighlight.id, {
          questionHtml,
          solutionHtml,
        });

        return { ok: true };
      }
      await this.mockExamQuestionHighlight.save(
        this.mockExamQuestionHighlight.create({
          questionHtml,
          solutionHtml,
          question: question,
          user: user,
        }),
      );
      return { ok: true };
    } catch (error) {
      return { ok: false, error: '오류가 발생했습니다.' };
    }
  }

  async deleteQuestionHighlight(
    user: User,
    deleteQuestionHighlightInput: DeleteQuestionHighlightInput,
  ): Promise<DeleteQuestionHighlightOutput> {
    try {
      const { questionId } = deleteQuestionHighlightInput;
      const highlight = await this.mockExamQuestionHighlight.findOne({
        where: {
          question: { id: questionId },
          user: { id: user.id },
        },
      });
      if (!highlight) {
        return { ok: false, error: '존재하지 않는 하이라이트입니다.' };
      }
      await this.mockExamQuestionHighlight.delete(highlight.id);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: '오류가 발생했습니다.' };
    }
  }
}
