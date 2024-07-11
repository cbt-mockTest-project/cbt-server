import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class MoveQuestionBookmarkInput {
  @Field(() => Number)
  bookmarkId: number;

  @Field(() => Number)
  bookmarkFolderId: number;
}

@ObjectType()
export class moveQuestionBookmarkOutput extends CoreOutput {}
