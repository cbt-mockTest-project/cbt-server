import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class DeleteQuestionCardsInput {
  @Field(() => [Number])
  ids: number[];
}

@ObjectType()
export class DeleteQuestionCardsOutput extends CoreOutput {}
