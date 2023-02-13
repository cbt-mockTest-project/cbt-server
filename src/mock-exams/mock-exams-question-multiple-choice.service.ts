import {
  CreateMockExamQuestionMultipleChoiceInput,
  CreateMockExamQuestionMultipleChoiceOutput,
} from './dtos/createMockExamQuestionMultipleChoice.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MockExamQuestion } from './entities/mock-exam-question.entity';
import { MockExamQuestionMultipleChoice } from './entities/mock-exam-question-multiple-choice.entity';

@Injectable()
export class MockExamQuestionMultipleChoiceService {
  constructor(
    @InjectRepository(MockExamQuestionMultipleChoice)
    private readonly mockExamQuestionMultipleChoice: Repository<MockExamQuestionMultipleChoice>,
    @InjectRepository(MockExamQuestion)
    private readonly mockExamQuestion: Repository<MockExamQuestion>,
  ) {}

  async createMutipleChoice(
    createMockExamQuestionMultipleChoiceInput: CreateMockExamQuestionMultipleChoiceInput,
  ): Promise<CreateMockExamQuestionMultipleChoiceOutput> {
    try {
      const { answer, options, questionId } =
        createMockExamQuestionMultipleChoiceInput;
      const prevQuestion = await this.mockExamQuestion.findOne({
        where: { id: questionId },
      });
      if (!prevQuestion) {
        return {
          ok: false,
          error: '존재하지 않는 문제입니다.',
        };
      }
      const multipleChoice = this.mockExamQuestionMultipleChoice.create({
        answer,
        options,
        question: prevQuestion,
      });
      await this.mockExamQuestionMultipleChoice.save(multipleChoice);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '객관식 문항 생성에 실패했습니다.',
      };
    }
  }
}
