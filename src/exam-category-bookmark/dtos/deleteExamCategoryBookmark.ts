import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class DeleteExamCategoryBookmarkInput {
  @Field(() => Number)
  userId: number;

  @Field(() => Number)
  categoryId: number;
}

@ObjectType()
export class DeleteExamCategoryBookmarkOutput extends CoreOutput {}
