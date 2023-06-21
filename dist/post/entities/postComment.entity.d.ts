import { Post } from './post.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { PostCommentLike } from './postCommentLike.entity';
export declare class PostComment extends CoreEntity {
    content: string;
    post: Post;
    user: User;
    commentLike: PostCommentLike[];
    likeState: boolean;
    likesCount?: number;
}
