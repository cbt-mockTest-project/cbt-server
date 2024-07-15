import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class DeleteQuestionBookmarkInput {
  @Field(() => Number)
  questionBookmarkId: number;
}

@ObjectType()
export class DeleteQuestionBookmarkOutput extends CoreOutput {}
