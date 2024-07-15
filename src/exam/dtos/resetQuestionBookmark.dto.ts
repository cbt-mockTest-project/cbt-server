import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class ResetQuestionBookmarkInput {
  @Field(() => Number)
  questionBookmarkFolderId: number;
}

@ObjectType()
export class ResetQuestionBookmarkOutput extends CoreOutput {}
