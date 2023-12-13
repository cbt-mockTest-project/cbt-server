import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class RemoveExamFromCategoryInput {
  @Field(() => Number)
  categoryId: number;
  @Field(() => Number)
  examId: number;
}

@ObjectType()
export class RemoveExamFromCategoryOutput extends CoreOutput {}
