import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class UpdateLinkedQuestionIdsInput {
  @Field(() => Number)
  questionId: number;

  @Field(() => [Number])
  linkedQuestionIds: number[];
}

@ObjectType()
export class UpdateLinkedQuestionIdsOutput extends CoreOutput {}
