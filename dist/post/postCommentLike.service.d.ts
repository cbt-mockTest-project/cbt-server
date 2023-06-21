import { User } from 'src/users/entities/user.entity';
import { PostComment } from './entities/postComment.entity';
import { Repository } from 'typeorm';
import { PostCommentLike } from './entities/postCommentLike.entity';
import { EditPostCommentLikeOutput, EditPostCommentLikeInput } from './dtos/editPostCommentLike.dto';
export declare class PostCommentLikeService {
    private readonly postCommentLike;
    private readonly comment;
    constructor(postCommentLike: Repository<PostCommentLike>, comment: Repository<PostComment>);
    editPostCommentLike(editPostCommentLikeInput: EditPostCommentLikeInput, user: User): Promise<EditPostCommentLikeOutput>;
}
