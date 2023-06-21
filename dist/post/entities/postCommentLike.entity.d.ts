import { PostComment } from './postComment.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
export declare class PostCommentLike extends CoreEntity {
    comment: PostComment;
    user: User;
}
