import { RevalidateService } from './../revalidate/revalidate.service';
import { PostComment } from './entities/postComment.entity';
/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { CreatePostInput, CreatePostOutput } from './dtos/createPost.dto';
import { DeletePostInput, DeletePostOutput } from './dtos/deletePost.dto';
import { EditPostInput, EditPostOutput } from './dtos/editPost.dto';
import { ReadPostInput, ReadPostOutput } from './dtos/readPost.dto';
import { ReadPostsInput, ReadPostsOutput } from './dtos/readPosts.dto';
import { ViewPostInput, ViewPostOutput } from './dtos/viewPost.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly post: Repository<Post>,
    private readonly revalidateService: RevalidateService,
  ) {}

  async createPost(
    createPostInput: CreatePostInput,
    user: User,
  ): Promise<CreatePostOutput> {
    try {
      const { content, title, category } = createPostInput;
      if (content && title && user) {
        const post = this.post.create({ content, title, user, category });
        await this.post.save(post);
        await this.revalidateService.revalidate({
          path: `/post/${post.id}`,
        });
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
      await this.revalidateService.revalidate({
        path: `/post/${savedPost.id}`,
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
      post.comment = post.comment.map((el) => {
        const newComment: PostComment = {
          ...el,
          likesCount: el.commentLike.length,
        };

        return newComment;
      });
      if (user) {
        post.likeState =
          post.like.filter((el) => el.user.id === user.id).length >= 1;
      }
      post.comment = post.comment.sort(
        (a, b) => Number(b.created_at) - Number(a.created_at),
      );
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
      let options: FindManyOptions<Post> = {
        relations: { user: true, like: true, comment: true },
      };
      if (!all) {
        options = {
          skip,
          take: limit,
          order: { priority: 'DESC', created_at: 'DESC' },
          relations: { user: true, like: true, comment: true },
          where: {
            category,
          },
        };
      }
      let [posts, count] = await this.post.findAndCount(options);
      posts = posts.map((post) => {
        return post;
      });
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
    } catch (e) {
      console.log(e);
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

  async converS3bucket_post() {
    const posts = await this.post.find();
    Promise.all(
      posts.map(async (post) => {
        post.content = post.content.replace(
          'cbteungwangnestjs961203',
          'moducbt-seoul',
        );
        await this.post.save(post);
      }),
    );
    return {
      ok: true,
    };
  }
}
