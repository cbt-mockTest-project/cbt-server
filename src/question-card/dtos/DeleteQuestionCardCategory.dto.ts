import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class DeleteQuestionCardCategoryInput {
  @Field(() => Number)
  id: number;
}

@ObjectType()
export class DeleteQuestionCardCategoryOutput extends CoreOutput {}
