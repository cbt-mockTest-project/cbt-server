import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MockExamQuestion } from 'src/mock-exams/entities/mock-exam-question.entity';
import { Repository } from 'typeorm';
import { GetRandomQuestionOutput } from './dtos/getRandomQuestion.dto';

@Injectable()
export class ZepService {
  constructor(
    @InjectRepository(MockExamQuestion)
    private readonly mockExamQuestion: Repository<MockExamQuestion>,
  ) {}
  async getRandomQuestion(
    categoryId: string,
  ): Promise<GetRandomQuestionOutput> {
    try {
      const questions = await this.mockExamQuestion.find({
        where: {
          mockExam: {
            mockExamCategory: {
              id: Number(categoryId),
            },
          },
        },
      });
      const randomQuestion =
        questions[Math.floor(Math.random() * questions.length)];
      return {
        ok: true,
        question: randomQuestion,
      };
    } catch {
      return {
        ok: false,
        error: '문제를 찾을 수 없습니다.',
      };
    }
  }
}
