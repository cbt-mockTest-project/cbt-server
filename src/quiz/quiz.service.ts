import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { In, Repository } from 'typeorm';
import { CreateQuizInput, CreateQuizOutput } from './dtos/createQuiz.dto';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';
import { MockExam } from 'src/exam/entities/mock-exam.entity';
import { MockExamQuestion } from 'src/exam/entities/mock-exam-question.entity';
import { shuffle } from 'lodash';
import { GetQuizsInput, GetQuizsOutput } from './dtos/getQuizs.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quiz: Repository<Quiz>,
    @InjectRepository(MockExamCategory)
    private readonly category: Repository<MockExamCategory>,
    @InjectRepository(MockExam)
    private readonly exam: Repository<MockExam>,
    @InjectRepository(MockExamQuestion)
    private readonly question: Repository<MockExamQuestion>,
  ) {}

  async createQuiz(
    createQuizInput: CreateQuizInput,
  ): Promise<CreateQuizOutput> {
    try {
      const { categoryId } = createQuizInput;

      const exams = await this.exam.find({
        where: {
          mockExamCategory: {
            id: categoryId,
          },
        },
      });
      const examIds = exams.map((exam) => exam.id);
      let questions = await this.question.find({
        where: {
          mockExam: {
            id: In(examIds),
          },
        },
        relations: {
          mockExam: true,
        },
      });
      questions = shuffle(questions);
      const quizs = questions.map((question, index) => {
        const date = format(
          new Date(
            new Date().getTime() + 1000 * 60 * 60 * 24 * Math.floor(index / 5),
          ),
          'yyyy-MM-dd',
          { locale: ko },
        );
        return {
          question: {
            id: question.id,
          },
          exam: {
            id: question.mockExam.id,
          },
          category: {
            id: categoryId,
          },
          date,
        };
      });
      this.quiz.save(quizs);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '퀴즈를 생성할 수 없습니다.',
      };
    }
  }

  async getQuizs(getQuizsInput: GetQuizsInput): Promise<GetQuizsOutput> {
    const { date, categoryId } = getQuizsInput;
    try {
      const quizs = await this.quiz.find({
        where: {
          date,
          category: {
            id: categoryId,
          },
        },
        relations: {
          category: true,
          question: {
            mockExam: true,
          },
          comment: {
            commentLike: true,
            user: true,
          },
          exam: true,
        },
        order: {
          id: 'ASC',
        },
      });
      return {
        ok: true,
        quizs,
      };
    } catch {
      return {
        ok: false,
        error: '퀴즈를 불러올 수 없습니다.',
      };
    }
  }
}
