import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import {
  MockExamQuestionFeedback,
  QuestionFeedbackType,
} from '../entities/mock-exam-question-feedback.entity';

@InputType()
export class GetFeedbacksWithFilterInput {
  @Field(() => Number, { nullable: true })
  examId?: number;
  @Field(() => Number, { nullable: true })
  categoryId?: number;
  @Field(() => Number, { nullable: true })
  goodCount?: number;
  @Field(() => Number, { nullable: true })
  badCount?: number;
  @Field(() => [QuestionFeedbackType], { nullable: true, defaultValue: [] })
  types?: QuestionFeedbackType[];
}

@ObjectType()
export class GetFeedbacksWithFilterOutput extends CoreOutput {
  @Field(() => [MockExamQuestionFeedback], { defaultValue: [] })
  feedbacks?: MockExamQuestionFeedback[];
}
