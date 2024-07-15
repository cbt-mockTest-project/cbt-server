import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class MoveQuestionBookmarkInput {
  @Field(() => Number)
  bookmarkId: number;

  @Field(() => Number, { nullable: true })
  bookmarkFolderId?: number;
}

@ObjectType()
export class moveQuestionBookmarkOutput extends CoreOutput {}
