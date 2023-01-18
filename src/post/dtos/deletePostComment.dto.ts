import { PostComment } from './../entities/postComment.entity';
import { CoreOutput } from '../../common/dtos/output.dto';
import { InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class DeletePostCommentInput extends PickType(PostComment, ['id']) {}

@ObjectType()
export class DeletePostCommentOutput extends CoreOutput {}
