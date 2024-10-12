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
import { Post, PostCategory } from './entities/post.entity';
import { PostData } from './entities/postData.entity';
import { PostFile } from './entities/postFile.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly post: Repository<Post>,
    @InjectRepository(PostData)
    private readonly postData: Repository<PostData>,
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
      const { content, title, category, data } = createPostInput;
      await queryRunner.connect();
      await queryRunner.startTransaction();

      if (data) {
        const postData = await queryRunner.manager.save(
          this.postData.create({
            user,
            price: data.price,
          }),
        );
        await queryRunner.manager.save(
          this.postFile.create({
            name: data.fileName,
            url: data.fileUrl,
            page: data.filePage,
            postData,
            user,
          }),
        );
        const post = await queryRunner.manager.save(
          this.post.create({
            content,
            title,
            user,
            category,
            data: postData,
          }),
        );
        await queryRunner.commitTransaction();
        await this.revalidateService.revalidate({
          path: `/post/${post.id}`,
        });
        return {
          ok: true,
          postId: post.id,
        };
      }

      const post = this.post.create({ content, title, user, category });
      await queryRunner.manager.save(post);
      await this.revalidateService.revalidate({
        path: `/post/${post.id}`,
      });
      await queryRunner.commitTransaction();
      return {
        postId: post.id,
        ok: true,
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
      const { title, content, id, data } = editPostInput;
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const prevPost = await this.post.findOne({
        where: { id, user: { id: user.id } },
        relations: {
          data: {
            postFile: true,
          },
        },
      });
      if (!prevPost) {
        return {
          ok: false,
          error: '존재하지 않는 게시글입니다.',
        };
      }
      if (data) {
        await queryRunner.manager.update(
          PostData,
          { id: prevPost.data.id },
          {
            price: data.price,
          },
        );
        await queryRunner.manager.update(
          PostFile,
          {
            id: prevPost.data.postFile[0].id,
          },
          {
            name: data.fileName,
            url: data.fileUrl,
            page: data.filePage,
            user,
          },
        );
        await queryRunner.manager.update(
          Post,
          { id },
          {
            content,
            title,
            user,
          },
        );
        await queryRunner.commitTransaction();
        this.revalidateService.revalidate({
          path: `/post/${id}`,
        });
        return { ok: true };
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
          like: { user: true },
          comment: { user: true, commentLike: { user: true } },
          data: { postFile: true },
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
      return {
        ok: false,
        error: '게시글을 불러오지 못했습니다.',
      };
    }
  }

  async readPosts(readPostsInput: ReadPostsInput): Promise<ReadPostsOutput> {
    try {
      const { page, limit, category, all, search, order } = readPostsInput;
      const skip = (page - 1) * limit;
      let options: FindManyOptions<Post> = {
        relations: { user: true, like: true, comment: true },
      };
      if (!all) {
        const orderOption: FindOptionsOrder<Post> = { priority: 'DESC' };
        if (order === PostOrderType.like) {
          orderOption.likesCount = 'DESC';
        }
        orderOption.created_at = 'DESC';
        options = {
          skip,
          take: limit,
          order: orderOption,
          relations: {
            user: true,
            like: true,
            comment: true,
            data: category === PostCategory.DATA ? { postFile: true } : false,
          },
          where: {
            category,
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
