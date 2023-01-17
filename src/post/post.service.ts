import { ReadPostsInput, ReadPostsOutput } from './dtos/readPosts.dto';
import { ReadPostInput, ReadPostOutput } from './dtos/readPost.dto';
import { DeletePostInput, DeletePostOutput } from './dtos/deletePost.dto';
import { EditPostInput, EditPostOutput } from './dtos/editPost.dto';
import { User } from 'src/users/entities/user.entity';
import { Post } from './entities/post.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostInput, CreatePostOutput } from './dtos/createPost.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly post: Repository<Post>,
  ) {}

  async createPost(
    createPostInput: CreatePostInput,
    user: User,
  ): Promise<CreatePostOutput> {
    try {
      const { content, title } = createPostInput;
      if (content && title && user) {
        const post = this.post.create({ content, title, user });
        await this.post.save(post);
      }
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '게시글 작성에 실패했습니다.',
      };
    }
  }

  async editPost(
    editPostInput: EditPostInput,
    user: User,
  ): Promise<EditPostOutput> {
    try {
      const { title, content, id } = editPostInput;
      const prevPost = await this.post.findOne({
        where: { id, user: { id: user.id } },
      });
      if (!prevPost) {
        return {
          ok: false,
          error: '존재하지 않는 게시글입니다.',
        };
      }
      const savedPost = await this.post.save({
        title: title,
        content: content,
        id,
      });
      return { ok: true, title: savedPost.title, content: savedPost.content };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: '게시글 수정에 실패했습니다.',
      };
    }
  }

  async deletePost(
    deletePostInput: DeletePostInput,
    user: User,
  ): Promise<DeletePostOutput> {
    try {
      const { id } = deletePostInput;
      const post = await this.post.findOne({
        where: { id, user: { id: user.id } },
      });
      if (!post) {
        return {
          ok: false,
          error: '존재하지 않는 게시글입니다.',
        };
      }
      await this.post.delete({ id });
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '게시글 삭제에 실패했습니다.',
      };
    }
  }

  async readPost(readPostInput: ReadPostInput): Promise<ReadPostOutput> {
    try {
      const { id } = readPostInput;
      const post = await this.post.findOne({ where: { id } });
      if (!post) {
        return {
          ok: false,
          error: '존재하지 않는 게시글 입니다.',
        };
      }
      return {
        ok: true,
        post,
      };
    } catch {
      return {
        ok: false,
        error: '게시글을 불러오지 못했습니다.',
      };
    }
  }

  async readPosts(readPostsInput: ReadPostsInput): Promise<ReadPostsOutput> {
    try {
      const { page, limit } = readPostsInput;
      const skip = (page - 1) * limit;
      const [posts, count] = await this.post.findAndCount({
        skip,
        take: limit,
      });
      return {
        posts,
        count,
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '게시글들을 불러오지 못했습니다.',
      };
    }
  }
}
