import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { MockExamQuestionFeedbackRecommendation } from '../entities/mock-exam-question-feedback-recommendation.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class UpdateMockExamQuestionFeedbackRecommendationInput extends PickType(
  MockExamQuestionFeedbackRecommendation,
  ['type'],
) {
  @Field(() => Number)
  feedbackId: number;
}

@ObjectType()
export class UpdateMockExamQuestionFeedbackRecommendationOutput extends CoreOutput {
  @Field(() => MockExamQuestionFeedbackRecommendation, { nullable: true })
  recommendation?: MockExamQuestionFeedbackRecommendation;
}
