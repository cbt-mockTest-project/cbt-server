import { MockExamQuestionMultipleChoice } from './../entities/mock-exam-question-multiple-choice.entity';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class CreateMockExamQuestionMultipleChoiceInput extends PickType(
  MockExamQuestionMultipleChoice,
  ['answer', 'options'],
) {
  @Field(() => Number)
  questionId: number;
}

@ObjectType()
export class CreateMockExamQuestionMultipleChoiceOutput extends CoreOutput {}
