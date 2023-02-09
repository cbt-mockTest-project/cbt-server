import {
  EditPostCommentInput,
  EditPostCommentOutput,
} from './dtos/editPostComment.dto';
import { User } from 'src/users/entities/user.entity';
import {
  CreatePostCommentInput,
  CreatePostCommentOutput,
} from './dtos/createPostComment.dto';
import { Post } from './entities/post.entity';
import { PostComment } from './entities/postComment.entity';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  DeletePostCommentInput,
  DeletePostCommentOutput,
} from './dtos/deletePostComment.dto';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from 'src/common/common.constants';
import { NoticeService } from 'src/users/notice.service';

@Injectable()
export class PostCommentSerivce {
  constructor(
    @InjectRepository(PostComment)
    private readonly mockExamQuestionComment: Repository<PostComment>,
    @InjectRepository(Post)
    private readonly mockExamQuestion: Repository<Post>,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
    private readonly noticeService: NoticeService,
  ) {}

  async createPostComment(
    createPostCommentInput: CreatePostCommentInput,
    user: User,
  ): Promise<CreatePostCommentOutput> {
    try {
      const { postId, content } = createPostCommentInput;

      const post = await this.mockExamQuestion.findOne({
        where: { id: postId },
        relations: { user: true },
      });
      if (!post) {
        return {
          ok: false,
          error: '존재하지 않는 게시글입니다.',
        };
      }
      const comment = this.mockExamQuestionComment.create({
        content,
        post,
        user,
      });
      await this.mockExamQuestionComment.save(comment);
      const noticeContent = `${post.title.substring(
        0,
        5,
      )}...게시글에 새로운 댓글이 달렸습니다.`;
      await this.noticeService.createNotice({
        userId: post.user.id,
        content: noticeContent,
        link: `/post/${post.id}`,
      });
      await this.pubSub.publish('postComments', {
        postCommentUpdates: {
          ok: true,
          authorId: post.user.id,
        },
      });
      return {
        comment,
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '댓글을 작성할 수 없습니다.',
      };
    }
  }

  async editPostComment(
    editPostCommentInput: EditPostCommentInput,
    user: User,
  ): Promise<EditPostCommentOutput> {
    try {
      const { id, content } = editPostCommentInput;
      const prevComment = await this.mockExamQuestionComment.findOne({
        where: {
          id,
          user: {
            id: user.id,
          },
        },
      });
      if (!prevComment) {
        return {
          ok: false,
          error: '존재하지 않는 댓글입니다.',
        };
      }
      prevComment.content = content;
      await this.mockExamQuestionComment.save([prevComment]);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '댓글을 수정할 수 없습니다.',
      };
    }
  }

  async deletePostComment(
    deletePostCommentInput: DeletePostCommentInput,
    user: User,
  ): Promise<DeletePostCommentOutput> {
    try {
      const { id } = deletePostCommentInput;
      const Comment = await this.mockExamQuestionComment.findOne({
        where: {
          id,
          user: {
            id: user.id,
          },
        },
      });
      if (!Comment) {
        return {
          ok: false,
          error: '존재하지 않는 댓글입니다.',
        };
      }
      this.mockExamQuestionComment.delete({ id });
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '댓글을 삭제 할 수 없습니다.',
      };
    }
  }
}
