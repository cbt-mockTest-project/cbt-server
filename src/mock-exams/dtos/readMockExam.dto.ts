import { MockExam } from './../entities/mock-exam.entity';
import { CoreOutput } from './../../common/dtos/output.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class ReadMockExamInput {
  @Field(() => Number)
  id: number;
}

@ObjectType()
export class ReadMockExamOutput extends CoreOutput {
  @Field(() => MockExam)
  mockExam?: MockExam;

  @Field(() => [Number])
  questionNumbers?: number[];
}
