import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class ToggleExamCategoryBookmarkInput {
  @Field(() => Number)
  categoryId: number;
}

@ObjectType()
export class ToggleExamCategoryBookmarkOutput extends CoreOutput {
  @Field(() => Boolean, { nullable: true })
  isBookmarked?: boolean;
}
