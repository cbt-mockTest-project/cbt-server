import { User } from 'src/users/entities/user.entity';
import { EditPostCommentLikeOutput, EditPostCommentLikeInput } from './dtos/editPostCommentLike.dto';
import { PostCommentLikeService } from './postCommentLike.service';
export declare class PostCommentLikeResolver {
    private readonly postCommentLikeService;
    constructor(postCommentLikeService: PostCommentLikeService);
    editPostCommentLike(editPostCommentLikeInput: EditPostCommentLikeInput, user: User): Promise<EditPostCommentLikeOutput>;
}
