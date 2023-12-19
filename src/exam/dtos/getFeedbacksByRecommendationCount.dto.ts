import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { MockExamQuestionFeedback } from '../entities/mock-exam-question-feedback.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class GetFeedbacksByRecommendationCountInput {
  @Field(() => Number)
  count: number;
}

@ObjectType()
export class GetFeedbacksByRecommendationCountOutput extends CoreOutput {
  @Field(() => [MockExamQuestionFeedback], { nullable: true })
  feedbacks?: MockExamQuestionFeedback[];
}
