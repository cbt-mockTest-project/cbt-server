import { CoreOutput } from '../../common/dtos/output.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class EditPostCommentLikeInput {
  @Field(() => Number)
  commentId: number;
}

@ObjectType()
export class EditPostCommentLikeOutput extends CoreOutput {
  @Field(() => Boolean, { defaultValue: false })
  currentState?: boolean;
}
