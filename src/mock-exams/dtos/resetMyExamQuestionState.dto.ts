import { CoreOutput } from 'src/common/dtos/output.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class ResetMyExamQuestionStateInput {
  @Field(() => Number, { nullable: true })
  examId?: number;
  @Field(() => [Number], { nullable: true })
  questionIds?: number[];
}

@ObjectType()
export class ResetMyExamQuestionStateOutput extends CoreOutput {}
