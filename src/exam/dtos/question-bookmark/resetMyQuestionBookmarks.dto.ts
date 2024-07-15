import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class ResetMyQuestionBookmarksInput {
  @Field(() => Number, { nullable: true })
  questionBookmarkFolderId?: number;
}

@ObjectType()
export class ResetMyQuestionBookmarksOutput extends CoreOutput {}
