import { CoreOutput } from '../../common/dtos/output.dto';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import {
  MockExamQuestionFeedback,
  QuestionFeedbackType,
} from '../entities/mock-exam-question-feedback.entity';

@InputType()
export class CreateMockExamQuestionFeedbackInput extends PickType(
  MockExamQuestionFeedback,
  ['content'],
) {
  @Field(() => Number)
  questionId: number;

  @Field(() => QuestionFeedbackType, {
    defaultValue: QuestionFeedbackType.PUBLIC,
  })
  type?: QuestionFeedbackType;
}

@ObjectType()
export class CreateMockExamQuestionFeedbackOutput extends CoreOutput {
  @Field(() => MockExamQuestionFeedback, { nullable: true })
  feedback?: MockExamQuestionFeedback;
}
