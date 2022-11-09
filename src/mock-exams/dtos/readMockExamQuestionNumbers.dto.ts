import { CoreOutput } from './../../common/dtos/output.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class ReadMockExamQuestionNumbersInput {
  @Field(() => Number)
  mockExamId: number;
}

@ObjectType()
export class ReadMockExamQuestionNumbersOutput extends CoreOutput {
  @Field(() => [Number])
  questionNumbers?: number[];
}
