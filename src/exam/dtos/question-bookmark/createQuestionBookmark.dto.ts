import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class CreateQuestionBookmarkInput {
  @Field(() => Number)
  questionId: number;

  @Field(() => Number, { nullable: true })
  questionBookmarkFolderId?: number;
}

@ObjectType()
export class CreateQuestionBookmarkOutput extends CoreOutput {}
