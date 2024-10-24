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
import {
  MockExamQuestionFeedback,
  QuestionFeedbackType,
} from './entities/mock-exam-question-feedback.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import {
  DeleteMockExamQuestionFeedbackInput,
  DeleteMockExamQuestionFeedbackOutput,
} from './dtos/deleteMockExamQuestionFeedback.dto';
import { GetExamTitleWithFeedbackOutput } from './dtos/getExamTitleWithFeedback.dto';
import { deduplication } from 'src/utils/utils';
import {
  GetFeedbacksWithFilterInput,
  GetFeedbacksWithFilterOutput,
} from './dtos/getFeedbacksWithFilter.dto';
import { QuestionFeedbackRecommendationType } from './entities/mock-exam-question-feedback-recommendation.entity';

import { TelegramService } from 'src/telegram/telegram.service';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';
import { ExamSource } from 'src/enums/enum';

@Injectable()
export class MockExamQuestionFeedbackSerivce {
  constructor(
    @InjectRepository(MockExamQuestionFeedback)
    private readonly mockExamQuestionFeedback: Repository<MockExamQuestionFeedback>,
    @InjectRepository(MockExamQuestion)
    private readonly mockExamQuestion: Repository<MockExamQuestion>,
    @InjectRepository(MockExamCategory)
    private readonly mockExamCategory: Repository<MockExamCategory>,
    private readonly telegramService: TelegramService,
  ) {}

  async createMockExamQuestionFeedback(
    createMockExamQuestionFeedbackInput: CreateMockExamQuestionFeedbackInput,
    user: User,
  ): Promise<CreateMockExamQuestionFeedbackOutput> {
    try {
      const { questionId, content, type } = createMockExamQuestionFeedbackInput;

      const question = await this.mockExamQuestion.findOne({
        where: { id: questionId },
        relations: {
          mockExam: true,
        },
      });
      const category = await this.mockExamCategory.findOne({
        where: {
          mockExam: {
            id: question.mockExam.id,
          },
        },
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

      if (type === QuestionFeedbackType.REPORT) {
        if (category.source === ExamSource.EHS_MASTER) {
          this.telegramService.sendMessageToTelegram({
            channelId: Number(process.env.TELEGRAM_EHSMASTER_REPORT_CHANNEL),
            message: `문제 피드백이 도착했습니다.\n보고자: ${user.nickname}\nhttps://moducbt.com/question/${question.id}`,
          });
        }
      }
      feedback.recommendationCount = { bad: 0, good: 0 };
      feedback.myRecommedationStatus = { isBad: false, isGood: false };
      return {
        ok: true,
        feedback,
      };
    } catch (e) {
      return {
        ok: false,
        error: '피드백을 보낼 수 없습니다.',
      };
    }
  }

  async editMockExamQuestionFeedback(
    user: User,
    editMockExamQuestionFeedbackInput: EditMockExamQuestionFeedbackInput,
  ): Promise<EditMockExamQuestionFeedbackOutput> {
    try {
      const { id, content, type } = editMockExamQuestionFeedbackInput;
      const prevFeedback = await this.mockExamQuestionFeedback.findOne({
        where: { id },
        relations: {
          user: true,
          mockExamQuestion: {
            user: true,
          },
        },
      });

      if (!prevFeedback) {
        return {
          ok: false,
          error: '존재하지 않는 피드백입니다.',
        };
      }
      // 문제 제작자는 수정가능
      if (
        prevFeedback.user.id !== user.id &&
        prevFeedback.mockExamQuestion.user.id !== user.id
      ) {
        return {
          ok: false,
          error: '권한이 없습니다.',
        };
      }
      prevFeedback.content = content;
      prevFeedback.type = type;
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
        relations: { user: true, mockExamQuestion: { user: true } },
      });
      // 자신의 글이 아니면 삭제불가, 롤이 어드민이면 무조건 삭제가능
      if (
        feedback.user.id !== user.id &&
        user.role !== UserRole.ADMIN &&
        user.id !== feedback.mockExamQuestion.user.id
      ) {
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

  async getExamTitleWithFeedback(
    user: User,
  ): Promise<GetExamTitleWithFeedbackOutput> {
    try {
      const feedbacks = await this.mockExamQuestionFeedback.find({
        where: [
          { mockExamQuestion: { mockExam: { user: { id: user.id } } } },
          {
            mockExamQuestion: {
              mockExam: { examCoAuthor: { user: { id: user.id } } },
            },
          },
        ],
        relations: {
          mockExamQuestion: {
            mockExam: true,
          },
        },
        order: {
          mockExamQuestion: {
            mockExam: {
              title: 'ASC',
            },
          },
        },
      });
      const titles = deduplication(
        feedbacks.map((feedback) => {
          const { id, title } = feedback.mockExamQuestion.mockExam;
          return {
            id,
            title,
          };
        }),
      );
      return {
        ok: true,
        titles,
      };
    } catch {
      return {
        ok: false,
        error: '시험 리스트를 불러올 수 없습니다.',
      };
    }
  }

  async getFeedbacksWithFilter(
    getFeedbacksWithFilterInput: GetFeedbacksWithFilterInput,
    user: User,
  ): Promise<GetFeedbacksWithFilterOutput> {
    try {
      const { examId, goodCount, badCount, types, categoryId } =
        getFeedbacksWithFilterInput;
      let query = this.mockExamQuestionFeedback
        .createQueryBuilder('feedback')
        .leftJoinAndSelect('feedback.mockExamQuestion', 'mockExamQuestion')
        .leftJoinAndSelect('feedback.recommendation', 'recommendation')
        .leftJoinAndSelect('feedback.user', 'user')
        .leftJoin('mockExamQuestion.mockExam', 'mockExam')
        .leftJoin('mockExam.examCoAuthor', 'examCoAuthor')
        .leftJoin('examCoAuthor.user', 'coAuthorUser')
        .leftJoin('mockExam.user', 'authorUser')
        .where(
          new Brackets((qb) => {
            qb.where('authorUser.id = :userId', { userId: user.id }).orWhere(
              'examCoAuthor.user.id =:coAuthorId',
              {
                coAuthorId: user.id,
              },
            );
          }),
        );

      if (examId) {
        query = query.andWhere('mockExam.id = :examId', { examId });
      }
      if (categoryId) {
        const category = await this.mockExamCategory.findOne({
          relations: {
            mockExam: true,
          },
          where: { id: categoryId },
        });
        const examIds = category.mockExam.map((exam) => exam.id);
        query = query.andWhere('mockExam.id IN (:...examIds)', { examIds });
      }
      if (types.length >= 1) {
        query = query.andWhere('feedback.type IN (:...types)', { types });
      }

      let feedbacks = await query.getMany();
      feedbacks = feedbacks
        .filter((feedback) => {
          const good = feedback.recommendation.filter(
            (recommedation) =>
              recommedation.type === QuestionFeedbackRecommendationType.GOOD,
          );
          const bad = feedback.recommendation.filter(
            (recommedation) =>
              recommedation.type === QuestionFeedbackRecommendationType.BAD,
          );
          return good.length >= goodCount && bad.length >= badCount;
        })
        .map((feedback) => {
          return {
            ...feedback,
            recommendationCount: {
              good: feedback.recommendation.filter(
                (recommedation) =>
                  recommedation.type ===
                  QuestionFeedbackRecommendationType.GOOD,
              ).length,
              bad: feedback.recommendation.filter(
                (recommedation) =>
                  recommedation.type === QuestionFeedbackRecommendationType.BAD,
              ).length,
            },
          };
        });
      return {
        ok: true,
        feedbacks,
      };
    } catch (e) {
      return {
        ok: false,
        error: '피드백을 불러올 수 없습니다.',
      };
    }
  }
  // recommendation.type === 'BAD' 인 요소를 3개 이상 가진 feedback private로 변경
  async hideNegativeFeedbacks() {
    try {
      const subQuery = this.mockExamQuestionFeedback
        .createQueryBuilder('subFeedback')
        .leftJoin('subFeedback.recommendation', 'subRecommendation')
        .select('subFeedback.id')
        .groupBy('subFeedback.id')
        .having('COUNT(subRecommendation.id) >= 3')
        .where('subRecommendation.type = :type', {
          type: QuestionFeedbackRecommendationType.BAD,
        });

      const feedbacks = await this.mockExamQuestionFeedback
        .createQueryBuilder('feedback')
        .leftJoinAndSelect('feedback.recommendation', 'recommendation')
        .leftJoinAndSelect('feedback.mockExamQuestion', 'question')
        .where(`feedback.id IN (${subQuery.getQuery()})`)
        .setParameters(subQuery.getParameters())
        .getMany();

      await Promise.all(
        feedbacks.map(async (feedbacks) => {
          this.mockExamQuestionFeedback.update(
            {
              id: feedbacks.id,
            },
            {
              type: QuestionFeedbackType.PRIVATE,
            },
          );
        }),
      );
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: '피드백을 숨길 수 없습니다.',
      };
    }
  }
}
