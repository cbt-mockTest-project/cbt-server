import { RevalidateService } from './../revalidate/revalidate.service';
import { PostComment } from './entities/postComment.entity';
/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { FindManyOptions, FindOptionsOrder, Like, Repository } from 'typeorm';
import { CreatePostInput, CreatePostOutput } from './dtos/createPost.dto';
import { DeletePostInput, DeletePostOutput } from './dtos/deletePost.dto';
import { EditPostInput, EditPostOutput } from './dtos/editPost.dto';
import { ReadPostInput, ReadPostOutput } from './dtos/readPost.dto';
import {
  PostOrderType,
  ReadPostsInput,
  ReadPostsOutput,
} from './dtos/readPosts.dto';
import { ViewPostInput, ViewPostOutput } from './dtos/viewPost.dto';
import { Post } from './entities/post.entity';
import { PostFile } from './entities/postFile.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly post: Repository<Post>,
    @InjectRepository(PostFile)
    private readonly postFile: Repository<PostFile>,
    private readonly revalidateService: RevalidateService,
  ) {}

  async createPost(
    createPostInput: CreatePostInput,
    user: User,
  ): Promise<CreatePostOutput> {
    const queryRunner = this.post.manager.connection.createQueryRunner();
    try {
      const { content, title, file } = createPostInput;
      await queryRunner.connect();
      await queryRunner.startTransaction();

      await queryRunner.manager.save(
        this.postFile.create({
          name: file.name,
          url: file.url,
          format: file.format,
          user,
        }),
      );

      const post = await queryRunner.manager.save(
        this.post.create({
          content,
          title,
          user,
        }),
      );
      await queryRunner.commitTransaction();

      return {
        ok: true,
        post,
      };
    } catch {
      await queryRunner.rollbackTransaction();
      return {
        ok: false,
        error: '게시글 작성에 실패했습니다.',
      };
    } finally {
      await queryRunner.release();
    }
  }

  async editPost(
    editPostInput: EditPostInput,
    user: User,
  ): Promise<EditPostOutput> {
    const queryRunner = this.post.manager.connection.createQueryRunner();
    try {
      const { title, content, id } = editPostInput;
      await queryRunner.connect();
      await queryRunner.startTransaction();

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
      await queryRunner.commitTransaction();
      this.revalidateService.revalidate({
        path: `/post/${id}`,
      });
      return { ok: true, title: savedPost.title, content: savedPost.content };
    } catch (e) {
      return {
        ok: false,
        error: '게시글 수정에 실패했습니다.',
      };
    } finally {
      await queryRunner.release();
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
          likes: { user: true },
          comments: { user: true, likes: { user: true } },
        },
      });
      if (!post) {
        return {
          ok: false,
          error: '존재하지 않는 게시글 입니다.',
        };
      }
      post.commentsCount = post.comments.length;
      post.likesCount = post.likes.length;
      post.comments = post.comments.map((el) => {
        const newComment: PostComment = {
          ...el,
          likesCount: el.likes.length,
        };

        return newComment;
      });
      if (user) {
        post.likeState =
          post.likes.filter((el) => el.user.id === user.id).length >= 1;
      }
      post.comments = post.comments.sort(
        (a, b) => Number(b.created_at) - Number(a.created_at),
      );
      return {
        ok: true,
        post,
      };
    } catch (e) {
      return {
        ok: false,
        error: '게시글을 불러오지 못했습니다.',
      };
    }
  }

  async readPosts(readPostsInput: ReadPostsInput): Promise<ReadPostsOutput> {
    try {
      const { page, limit, all, search, order } = readPostsInput;
      const skip = (page - 1) * limit;
      let options: FindManyOptions<Post> = {
        relations: { user: true, likes: true, comments: true },
      };
      if (!all) {
        const orderOption: FindOptionsOrder<Post> = { created_at: 'DESC' };
        if (order === PostOrderType.like) {
          orderOption.likesCount = 'DESC';
        }
        options = {
          skip,
          take: limit,
          order: orderOption,
          relations: {
            user: true,
            likes: true,
            comments: true,
          },
          where: {
            title: search ? Like(`%${search}%`) : undefined,
            isHidden: false,
          },
        };
      }
      let [posts, count] = await this.post.findAndCount(options);
      if (!all) {
        posts = posts.map((post) => {
          return {
            ...post,
            likesCount: post.likes.length,
            commentsCount: post.comments.length,
          };
        });
      }
      return {
        posts,
        count,
        ok: true,
      };
    } catch (e) {
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
