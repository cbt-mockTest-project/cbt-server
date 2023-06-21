import { User } from 'src/users/entities/user.entity';
import { EditPostLikeOutput, EditPostLikeInput } from './dtos/editPostLike.dto';
import { PostLikeService } from './postLike.service';
export declare class PostLikeResolver {
    private readonly postLikeService;
    constructor(postLikeService: PostLikeService);
    editPostLike(editPostLikeInput: EditPostLikeInput, user: User): Promise<EditPostLikeOutput>;
}
