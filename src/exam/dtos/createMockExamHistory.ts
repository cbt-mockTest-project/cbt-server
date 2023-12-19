import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class CreateMockExamHistoryInput {
  @Field(() => Number)
  examId: number;
}

@ObjectType()
export class CreateMockExamHistoryOutput extends CoreOutput {}
