import { MockExamQuestionFeedback } from './../entities/mock-exam-question-feedback.entity';
import { CoreOutput } from './../../common/dtos/output.dto';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ReadAllMockExamQuestionFeedbackOutput extends CoreOutput {
  @Field(() => [MockExamQuestionFeedback])
  feedbacks?: MockExamQuestionFeedback[];
}
