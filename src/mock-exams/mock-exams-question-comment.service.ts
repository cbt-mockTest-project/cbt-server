import {
  ReadMockExamQuestionCommentsByQuestinIdOutput,
  ReadMockExamQuestionCommentsByQuestinIdInput,
  MockExamQuestionCommentIncludingLikeState,
} from './dtos/readMockExamQuestionCommentsByQuestinId.dto';
import { User } from 'src/users/entities/user.entity';
import {
  EditMockExamQuestionCommentInput,
  EditMockExamQuestionCommentOutput,
} from './dtos/editMockExamQuestionComment.dto';
import {
  CreateMockExamQuestionCommentInput,
  CreateMockExamQuestionCommentOutput,
} from './dtos/createMockExamQuestionComment.dto';
import { MockExamQuestion } from './entities/mock-exam-question.entity';
import { MockExamQuestionComment } from './entities/mock-exam-question-Comment.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  DeleteMockExamQuestionCommentInput,
  DeleteMockExamQuestionCommentOutput,
} from './dtos/deleteMockExamQuestionComment.dto';
import { MockExamQuestionCommentLike } from './entities/mock-exam-question-comment-like.entity';

@Injectable()
export class MockExamQuestionCommentSerivce {
  constructor(
    @InjectRepository(MockExamQuestionCommentLike)
    private readonly mockExamQuestionCommentLike: Repository<MockExamQuestionCommentLike>,
    @InjectRepository(MockExamQuestionComment)
    private readonly mockExamQuestionComment: Repository<MockExamQuestionComment>,
    @InjectRepository(MockExamQuestion)
    private readonly mockExamQuestion: Repository<MockExamQuestion>,
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  async createMockExamQuestionComment(
    createMockExamQuestionCommentInput: CreateMockExamQuestionCommentInput,
    user: User,
  ): Promise<CreateMockExamQuestionCommentOutput> {
    try {
      const { questionId, content } = createMockExamQuestionCommentInput;

      const question = await this.mockExamQuestion.findOne({
        where: { id: questionId },
      });
      if (!question) {
        return {
          ok: false,
          error: '존재하지 않는 문제입니다.',
        };
      }
      const Comment = this.mockExamQuestionComment.create({
        content,
        question,
        user,
      });
      await this.mockExamQuestionComment.save(Comment);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '댓글을 작성할 수 없습니다.',
      };
    }
  }

  async editMockExamQuestionComment(
    editMockExamQuestionCommentInput: EditMockExamQuestionCommentInput,
    user: User,
  ): Promise<EditMockExamQuestionCommentOutput> {
    try {
      const { id, content } = editMockExamQuestionCommentInput;
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

  async deleteMockExamQuestionComment(
    deleteMockExamQuestionCommentInput: DeleteMockExamQuestionCommentInput,
    user,
  ): Promise<DeleteMockExamQuestionCommentOutput> {
    try {
      const { id } = deleteMockExamQuestionCommentInput;
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

  async readMockExamQuestionCommentsByQuestinoId(
    readMockExamQuestionCommentsByQuestinIdInput: ReadMockExamQuestionCommentsByQuestinIdInput,
    user: User,
  ): Promise<ReadMockExamQuestionCommentsByQuestinIdOutput> {
    try {
      const { questionId } = readMockExamQuestionCommentsByQuestinIdInput;
      const comments = await this.mockExamQuestionComment.find({
        where: {
          question: { id: questionId },
        },
        relations: { user: true },
      });
      let commentsIncludingLikeState: MockExamQuestionCommentIncludingLikeState[] =
        [];
      if (user && comments && comments.length >= 1) {
        commentsIncludingLikeState = await Promise.all(
          comments.map(async (comment) => {
            const like = await this.mockExamQuestionCommentLike.findOne({
              where: {
                user: { id: user.id },
                comment: {
                  id: comment.id,
                },
              },
            });
            if (like) {
              return { ...comment, likeState: true };
            }
            return { ...comment, likeState: false };
          }),
        );
      }
      return {
        comments: commentsIncludingLikeState,
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '댓글을 불러올 수  없습니다.',
      };
    }
  }
}
