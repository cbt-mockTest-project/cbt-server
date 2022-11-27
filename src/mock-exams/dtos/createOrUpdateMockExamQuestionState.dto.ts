import { CoreOutput } from './../../common/dtos/output.dto';
import {
  MockExamQuestionState,
  QuestionState,
} from './../entities/mock-exam-question-state.entity';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class CreateOrUpdateMockExamQuestionStateInput extends PickType(
  MockExamQuestionState,
  ['state'],
) {
  @Field(() => Number)
  questionId: number;
}

@ObjectType()
export class CreateOrUpdateMockExamQuestionStateOutput extends CoreOutput {
  @Field(() => String, { nullable: true })
  message?: string;
  @Field(() => QuestionState, { nullable: true })
  currentState?: QuestionState;
}
