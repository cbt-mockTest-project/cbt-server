import { User } from 'src/users/entities/user.entity';
import { DeletePostCommentInput, DeletePostCommentOutput } from './dtos/deletePostComment.dto';
import { CreatePostCommentInput, CreatePostCommentOutput } from './dtos/createPostComment.dto';
import { EditPostCommentInput, EditPostCommentOutput } from './dtos/editPostComment.dto';
import { PostCommentSerivce } from './postComment.service';
import { PubSub } from 'graphql-subscriptions';
export declare class PostCommentResolver {
    private readonly postCommentSerivce;
    private readonly pubSub;
    constructor(postCommentSerivce: PostCommentSerivce, pubSub: PubSub);
    createPostComment(createPostCommentInput: CreatePostCommentInput, user: User): Promise<CreatePostCommentOutput>;
    editPostComment(editPostCommentInput: EditPostCommentInput, user: User): Promise<EditPostCommentOutput>;
    deletePostComment(deletePostCommentInput: DeletePostCommentInput, user: User): Promise<DeletePostCommentOutput>;
}
