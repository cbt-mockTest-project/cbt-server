import { PostComment } from './../entities/postComment.entity';
import { CoreOutput } from '../../common/dtos/output.dto';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class CreatePostCommentInput extends PickType(PostComment, ['content']) {
  @Field(() => Number)
  postId: number;
}

@ObjectType()
export class CreatePostCommentOutput extends CoreOutput {
  @Field(() => PostComment)
  comment?: PostComment;
}
