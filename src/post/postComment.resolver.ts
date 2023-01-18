import { PostComment } from './entities/postComment.entity';

import { User } from 'src/users/entities/user.entity';
import {
  DeletePostCommentInput,
  DeletePostCommentOutput,
} from './dtos/deletePostComment.dto';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Role } from 'src/auth/role.decorators';
import {
  CreatePostCommentInput,
  CreatePostCommentOutput,
} from './dtos/createPostComment.dto';
import {
  EditPostCommentInput,
  EditPostCommentOutput,
} from './dtos/editPostComment.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { PostCommentSerivce } from './postComment.service';

@Resolver(() => PostComment)
export class PostCommentResolver {
  constructor(private readonly postCommentSerivce: PostCommentSerivce) {}

  @Mutation(() => CreatePostCommentOutput)
  @Role(['ANY'])
  createPostComment(
    @Args('input')
    createPostCommentInput: CreatePostCommentInput,
    @AuthUser() user: User,
  ): Promise<CreatePostCommentOutput> {
    return this.postCommentSerivce.createPostComment(
      createPostCommentInput,
      user,
    );
  }

  @Mutation(() => EditPostCommentOutput)
  @Role(['ANY'])
  async editPostComment(
    @Args('input')
    editPostCommentInput: EditPostCommentInput,
    @AuthUser() user: User,
  ): Promise<EditPostCommentOutput> {
    return this.postCommentSerivce.editPostComment(editPostCommentInput, user);
  }

  @Mutation(() => DeletePostCommentOutput)
  @Role(['ANY'])
  async deletePostComment(
    @Args('input')
    deletePostCommentInput: DeletePostCommentInput,
    @AuthUser() user: User,
  ): Promise<DeletePostCommentOutput> {
    return this.postCommentSerivce.deletePostComment(
      deletePostCommentInput,
      user,
    );
  }
}
