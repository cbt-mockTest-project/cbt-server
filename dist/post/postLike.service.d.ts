import { User } from 'src/users/entities/user.entity';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { PostLike } from './entities/postLike.entity';
import { EditPostLikeOutput, EditPostLikeInput } from './dtos/editPostLike.dto';
export declare class PostLikeService {
    private readonly postLike;
    private readonly post;
    constructor(postLike: Repository<PostLike>, post: Repository<Post>);
    editPostLike(editPostLikeInput: EditPostLikeInput, user: User): Promise<EditPostLikeOutput>;
}
