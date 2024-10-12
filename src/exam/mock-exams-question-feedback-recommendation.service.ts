import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MockExamQuestionFeedbackRecommendation } from './entities/mock-exam-question-feedback-recommendation.entity';
import { MockExamQuestionFeedback } from './entities/mock-exam-question-feedback.entity';
import { User } from 'src/users/entities/user.entity';
import {
  UpdateMockExamQuestionFeedbackRecommendationInput,
  UpdateMockExamQuestionFeedbackRecommendationOutput,
} from './dtos/updateMockExamQuestionFeedbackRecommendation.dto';
import {
  GetFeedbacksByRecommendationCountInput,
  GetFeedbacksByRecommendationCountOutput,
} from './dtos/getFeedbacksByRecommendationCount.dto';

@Injectable()
export class MockExamQuestionFeedbackRecommendationService {
  constructor(
    @InjectRepository(MockExamQuestionFeedbackRecommendation)
    private readonly mockExamQuestionFeedbackRecommendation: Repository<MockExamQuestionFeedbackRecommendation>,
    @InjectRepository(MockExamQuestionFeedback)
    private readonly mockExamQuestionFeedback: Repository<MockExamQuestionFeedback>,
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}
  async updateMockExamQuestionFeedbackRecommendation(
    updateMockExamQuestionFeedbackRecommendationInput: UpdateMockExamQuestionFeedbackRecommendationInput,
    user: User,
  ): Promise<UpdateMockExamQuestionFeedbackRecommendationOutput> {
    try {
      const { type, feedbackId } =
        updateMockExamQuestionFeedbackRecommendationInput;
      const feedback = await this.mockExamQuestionFeedback.findOne({
        where: { id: feedbackId },
      });
      if (!feedback) {
        return {
          ok: false,
          error: 'Feedback not found',
        };
      }

      const prevRecommendation =
        await this.mockExamQuestionFeedbackRecommendation.findOne({
          where: {
            user: { id: user.id },
            feedback: { id: feedbackId },
          },
        });
      if (!prevRecommendation) {
        const newRecommendation =
          await this.mockExamQuestionFeedbackRecommendation.save(
            this.mockExamQuestionFeedbackRecommendation.create({
              user,
              feedback,
              type,
            }),
          );
        return {
          ok: true,
          recommendation: newRecommendation,
        };
      }
      if (prevRecommendation.type === type) {
        await this.mockExamQuestionFeedbackRecommendation.delete({
          id: prevRecommendation.id,
        });
        return {
          ok: true,
          recommendation: null,
        };
      }
      if (prevRecommendation.type !== type) {
        const newRecommendation =
          await this.mockExamQuestionFeedbackRecommendation.save({
            id: prevRecommendation.id,
            type,
          });
        return {
          ok: true,
          recommendation: newRecommendation,
        };
      }
      return {
        ok: false,
        error: 'Something went wrong',
      };
    } catch (e) {
      return {
        ok: false,
      };
    }
  }

  async getFeedbacksByRecommendationCount(
    getFeedbacksByRecommendationCountInput: GetFeedbacksByRecommendationCountInput,
  ): Promise<GetFeedbacksByRecommendationCountOutput> {
    try {
      const { count } = getFeedbacksByRecommendationCountInput;
      const subQuery = this.mockExamQuestionFeedback
        .createQueryBuilder('subFeedback')
        .leftJoin('subFeedback.recommendation', 'subRecommendation')
        .select('subFeedback.id')
        .groupBy('subFeedback.id')
        .having(`COUNT(subRecommendation.id) >= ${count}`);

      const feedbacks = await this.mockExamQuestionFeedback
        .createQueryBuilder('feedback')
        .leftJoinAndSelect('feedback.recommendation', 'recommendation')
        .leftJoinAndSelect('feedback.mockExamQuestion', 'question')
        .where(`feedback.id IN (${subQuery.getQuery()})`)
        .setParameters(subQuery.getParameters())
        .getMany();
      return {
        ok: true,
        feedbacks,
      };
    } catch (e) {
      return {
        ok: false,
        error: 'Something went wrong',
      };
    }
  }
}
