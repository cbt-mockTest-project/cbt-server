import { ReadPostInput, ReadPostOutput } from './dtos/readPost.dto';
import { Role } from './../auth/role.decorators';
import { User } from 'src/users/entities/user.entity';
import { Post } from './entities/post.entity';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { PostService } from './post.service';
import { CreatePostInput, CreatePostOutput } from './dtos/createPost.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { EditPostInput, EditPostOutput } from './dtos/editPost.dto';
import { DeletePostInput, DeletePostOutput } from './dtos/deletePost.dto';
import { ReadPostsInput, ReadPostsOutput } from './dtos/readPosts.dto';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Role(['ANY'])
  @Mutation(() => CreatePostOutput)
  async createPost(
    @Args('input')
    createPostInput: CreatePostInput,
    @AuthUser()
    user: User,
  ): Promise<CreatePostOutput> {
    return this.postService.createPost(createPostInput, user);
  }

  @Role(['ANY'])
  @Mutation(() => EditPostOutput)
  async editPost(
    @Args('input')
    editPostInput: EditPostInput,
    @AuthUser()
    user: User,
  ): Promise<EditPostOutput> {
    return this.postService.editPost(editPostInput, user);
  }

  @Role(['ANY'])
  @Mutation(() => DeletePostOutput)
  async deletePost(
    @Args('input')
    deletePostInput: DeletePostInput,
    @AuthUser()
    user: User,
  ): Promise<DeletePostOutput> {
    return this.postService.deletePost(deletePostInput, user);
  }

  @Query(() => ReadPostOutput)
  async readPost(
    @Args('input') readPostInput: ReadPostInput,
  ): Promise<ReadPostOutput> {
    return this.postService.readPost(readPostInput);
  }

  @Query(() => ReadPostsOutput)
  async readPosts(
    @Args('input') readPostsInput: ReadPostsInput,
  ): Promise<ReadPostOutput> {
    return this.postService.readPosts(readPostsInput);
  }
}
