import { CoreOutput } from './../../common/dtos/output.dto';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { MockExamQuestionFeedback } from '../entities/mock-exam-question-feedback.entity';

@InputType()
export class CreateMockExamQuestionFeedbackInput extends PickType(
  MockExamQuestionFeedback,
  ['content'],
) {
  @Field(() => Number)
  questionId: number;
}

@ObjectType()
export class CreateMockExamQuestionFeedbackOutput extends CoreOutput {
  @Field(() => MockExamQuestionFeedback, { nullable: true })
  feedback?: MockExamQuestionFeedback;
}
