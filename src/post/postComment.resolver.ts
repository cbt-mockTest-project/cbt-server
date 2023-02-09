import { PUB_SUB } from 'src/common/common.constants';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { PostComment } from './entities/postComment.entity';

import { User } from 'src/users/entities/user.entity';
import {
  DeletePostCommentInput,
  DeletePostCommentOutput,
} from './dtos/deletePostComment.dto';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
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
import { PubSub } from 'graphql-subscriptions';
import { Inject } from '@nestjs/common';

@Resolver(() => PostComment)
export class PostCommentResolver {
  constructor(
    private readonly postCommentSerivce: PostCommentSerivce,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

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

  @Role(['ANY'])
  @Subscription(() => CoreOutput, {
    filter: (payload, variables, context) => {
      if (context.user.id !== payload.postCommentUpdates.authorId) {
        return false;
      }
      return true;
    },
  })
  postCommentUpdates() {
    return this.pubSub.asyncIterator('postComments');
  }
}
