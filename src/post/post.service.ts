import { PostComment } from './entities/postComment.entity';
/* eslint-disable prefer-const */
import { ReadPostsInput, ReadPostsOutput } from './dtos/readPosts.dto';
import { ReadPostInput, ReadPostOutput } from './dtos/readPost.dto';
import { DeletePostInput, DeletePostOutput } from './dtos/deletePost.dto';
import { EditPostInput, EditPostOutput } from './dtos/editPost.dto';
import { User } from 'src/users/entities/user.entity';
import { Post } from './entities/post.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreatePostInput, CreatePostOutput } from './dtos/createPost.dto';
import { ViewPostInput, ViewPostOutput } from './dtos/viewPost.dto';

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

  async readPost(
    readPostInput: ReadPostInput,
    user: User,
  ): Promise<ReadPostOutput> {
    try {
      const { id } = readPostInput;
      let post = await this.post.findOne({
        where: { id },
        relations: {
          user: true,
          like: { user: true },
          comment: { user: true, commentLike: { user: true } },
        },
      });
      if (!post) {
        return {
          ok: false,
          error: '존재하지 않는 게시글 입니다.',
        };
      }
      post.commentsCount = post.comment.length;
      post.likesCount = post.like.length;
      if (user) {
        post.comment = post.comment.map((el) => {
          const likeState =
            el.commentLike.filter((el) => el.user.id === user.id).length >= 1;
          const newComment: PostComment = {
            ...el,
            likesCount: el.commentLike.length,
            likeState,
          };

          return newComment;
        });
        post.likeState =
          post.like.filter((el) => el.user.id === user.id).length >= 1;
      }
      return {
        ok: true,
        post,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: '게시글을 불러오지 못했습니다.',
      };
    }
  }

  async readPosts(readPostsInput: ReadPostsInput): Promise<ReadPostsOutput> {
    try {
      const { page, limit, category, all } = readPostsInput;
      const skip = (page - 1) * limit;
      let options: FindManyOptions<Post> = {};
      if (!all) {
        options = {
          skip,
          take: limit,
          relations: { user: true, like: true, comment: true },
          where: {
            category,
          },
        };
      }
      let [posts, count] = await this.post.findAndCount(options);
      if (!all) {
        posts = posts.map((post) => {
          return {
            ...post,
            likesCount: post.like.length,
            commentsCount: post.comment.length,
          };
        });
      }
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

  async viewPost(viewPostInput: ViewPostInput): Promise<ViewPostOutput> {
    try {
      const { postId } = viewPostInput;
      const post = await this.post.findOne({ where: { id: postId } });
      if (!post) {
        return {
          ok: false,
          error: '존재하지 않는 게시글입니다.',
        };
      }
      const updatedPost = this.post.create({ ...post, view: post.view + 1 });
      this.post.save(updatedPost);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '죄회수를 올릴 수 없습니다.',
      };
    }
  }
}
