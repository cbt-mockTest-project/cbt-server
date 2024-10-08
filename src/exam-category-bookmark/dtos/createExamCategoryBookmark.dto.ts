import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class CreateExamCategoryBookmarkInput {
  @Field(() => Number)
  categoryId: number;
}

@ObjectType()
export class CreateExamCategoryBookmarkOutput extends CoreOutput {}
