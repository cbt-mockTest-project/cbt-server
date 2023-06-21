import { PostComment } from './postComment.entity';
import { User } from './../../users/entities/user.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { PostLike } from './postLike.entity';
export declare enum PostCategory {
    FREE = "FREE",
    REVIEW = "REVIEW",
    RECOVERY = "RECOVERY",
    NOTICE = "NOTICE",
    CHECKIN = "CHECKIN",
    SUGGENSTION = "SUGGENSTION"
}
export declare class Post extends CoreEntity {
    title: string;
    content: string;
    category: PostCategory;
    comment: PostComment[];
    like: PostLike[];
    user: User;
    view: number;
    likeState: boolean;
    priority: number;
    isHidden: boolean;
    likesCount?: number;
    commentsCount?: number;
    commentLikeState: boolean;
    commentLikesCount?: number;
}
