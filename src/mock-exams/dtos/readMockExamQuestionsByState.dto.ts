import {
  MockExamQuestionState,
  QuestionState,
} from './../entities/mock-exam-question-state.entity';
import { CoreOutput } from './../../common/dtos/output.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class ReadMockExamQuestionsByStateInput {
  @Field(() => Number)
  examId: number;

  @Field(() => [QuestionState])
  states: QuestionState[];
}

@ObjectType()
export class ReadMockExamQuestionsByStateOutput extends CoreOutput {
  @Field(() => [MockExamQuestionState])
  mockExamQusetions?: MockExamQuestionState[];
}
