import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MockExamQuestionFeedbackRecommendation } from './entities/mock-exam-question-feedback-recommendation.entity';
import { MockExamQuestionFeedbackRecommendationService } from './mock-exams-question-feedback-recommendation.service';
import {
  UpdateMockExamQuestionFeedbackRecommendationInput,
  UpdateMockExamQuestionFeedbackRecommendationOutput,
} from './dtos/updateMockExamQuestionFeedbackRecommendation.dto';
import { User } from 'src/users/entities/user.entity';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorators';

@Resolver(() => MockExamQuestionFeedbackRecommendation)
export class MockExamQuestionFeedbackRecommendationResolver {
  constructor(
    private readonly mockExamQuestionFeedbackRecommendationService: MockExamQuestionFeedbackRecommendationService,
  ) {}

  @Role(['ANY'])
  @Mutation(() => UpdateMockExamQuestionFeedbackRecommendationOutput)
  async updateMockExamQuestionFeedbackRecommendation(
    @Args('input')
    updateMockExamQuestionFeedbackRecommendationInput: UpdateMockExamQuestionFeedbackRecommendationInput,
    @AuthUser() user: User,
  ): Promise<UpdateMockExamQuestionFeedbackRecommendationOutput> {
    return this.mockExamQuestionFeedbackRecommendationService.updateMockExamQuestionFeedbackRecommendation(
      updateMockExamQuestionFeedbackRecommendationInput,
      user,
    );
  }
}
