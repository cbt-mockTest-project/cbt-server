import { MockExamQuestion } from './../entities/mock-exam-question.entity';
import { CoreOutput } from './../../common/dtos/output.dto';
import { MockExamQuestionState } from './../entities/mock-exam-question-state.entity';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class ReadMockExamQuestionsByStateInput extends PickType(
  MockExamQuestionState,
  ['state'],
) {
  @Field(() => Number)
  examId: number;
}

@ObjectType()
export class ReadMockExamQuestionsByStateOutput extends CoreOutput {
  @Field(() => [MockExamQuestion])
  mockExamQusetions?: MockExamQuestion[];
}
