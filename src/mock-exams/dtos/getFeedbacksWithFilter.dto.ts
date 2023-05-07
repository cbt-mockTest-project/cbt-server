import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { MockExamQuestionFeedback } from '../entities/mock-exam-question-feedback.entity';

@InputType()
export class GetFeedbacksWithFilterInput {
  @Field(() => Number)
  examId: number;
  @Field(() => Number)
  goodCount: number;
  @Field(() => Number)
  badCount: number;
}

@ObjectType()
export class GetFeedbacksWithFilterOutput extends CoreOutput {
  @Field(() => [MockExamQuestionFeedback], { defaultValue: [] })
  feedbacks?: MockExamQuestionFeedback[];
}
