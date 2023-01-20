import { User } from 'src/users/entities/user.entity';
import {
  EditPostCommentLikeOutput,
  EditPostCommentLikeInput,
} from './dtos/editPostCommentLike.dto';
import { PostCommentLikeService } from './postCommentLike.service';
import { PostCommentLike } from './entities/postCommentLike.entity';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorators';

@Resolver(() => PostCommentLike)
export class PostCommentLikeResolver {
  constructor(
    private readonly postCommentLikeService: PostCommentLikeService,
  ) {}

  @Role(['ANY'])
  @Mutation(() => EditPostCommentLikeOutput)
  async editPostCommentLike(
    @Args('input')
    editPostCommentLikeInput: EditPostCommentLikeInput,
    @AuthUser()
    user: User,
  ): Promise<EditPostCommentLikeOutput> {
    return this.postCommentLikeService.editPostCommentLike(
      editPostCommentLikeInput,
      user,
    );
  }
}
