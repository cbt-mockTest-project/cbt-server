import { CoreEntity } from '../../common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Post } from './post.entity';
export declare class PostLike extends CoreEntity {
    post: Post;
    user: User;
}
