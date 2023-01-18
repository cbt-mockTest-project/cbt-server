import { User } from 'src/users/entities/user.entity';
import { EditPostLikeOutput, EditPostLikeInput } from './dtos/editPostLike.dto';
import { PostLikeService } from './postLike.service';
import { PostLike } from './entities/postLike.entity';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorators';

@Resolver(() => PostLike)
export class PostLikeResolver {
  constructor(private readonly postLikeService: PostLikeService) {}

  @Role(['ANY'])
  @Mutation(() => EditPostLikeOutput)
  async editPostLike(
    @Args('input')
    editPostLikeInput: EditPostLikeInput,
    @AuthUser()
    user: User,
  ): Promise<EditPostLikeOutput> {
    return this.postLikeService.editPostLike(editPostLikeInput, user);
  }
}
