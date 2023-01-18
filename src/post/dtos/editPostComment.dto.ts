import { PostComment } from './../entities/postComment.entity';
import { CoreOutput } from '../../common/dtos/output.dto';
import { InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class EditPostCommentInput extends PickType(PostComment, [
  'id',
  'content',
]) {}

@ObjectType()
export class EditPostCommentOutput extends CoreOutput {}
