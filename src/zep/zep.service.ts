import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MockExamQuestion } from 'src/exam/entities/mock-exam-question.entity';
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
      console.log(randomQuestion);
      return {
        ok: true,
        question: {
          ...randomQuestion,
          question: transformHtmlString(randomQuestion.question),
          solution: transformHtmlString(randomQuestion.solution),
        },
      };
    } catch {
      return {
        ok: false,
        error: '문제를 찾을 수 없습니다.',
      };
    }
  }
}

function transformHtmlString(htmlStr: string) {
  // 정규 표현식을 사용하여 <p> 태그로 감싸진 내용을 찾습니다.
  const regex = /<p>(.*?)<\/p>/g;

  // 모든 <p>...</p> 세그먼트를 찾아 처리합니다.
  const transformedStr = htmlStr.replace(regex, (match, p1) => {
    // HTML 태그를 제거합니다.
    const withoutTags = p1.replace(/<[^>]+>/g, '');
    // 개행 문자를 추가합니다.
    return withoutTags + '\n';
  });

  return transformedStr;
}
