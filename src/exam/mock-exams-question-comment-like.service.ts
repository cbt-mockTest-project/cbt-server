import { MockExamQuestionComment } from './entities/mock-exam-question-comment.entity';
import {
  ReadMockExamQuestionCommentLikesByQuestinIdInput,
  ReadMockExamQuestionCommentLikesByQuestinIdOutput,
} from './dtos/readMockExamQuestionCommentLikesByQuestinId.dto';
import { User } from 'src/users/entities/user.entity';
import { MockExamQuestion } from './entities/mock-exam-question.entity';
import { MockExamQuestionCommentLike } from './entities/mock-exam-question-comment-like.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  EditMockExamQuestionCommentLikeInput,
  EditMockExamQuestionCommentLikeOutput,
} from './dtos/editMockExamQuestionCommentLike.dto';

@Injectable()
export class MockExamQuestionCommentLikeSerivce {
  constructor(
    @InjectRepository(MockExamQuestionCommentLike)
    private readonly mockExamQuestionCommentLike: Repository<MockExamQuestionCommentLike>,
    @InjectRepository(MockExamQuestionComment)
    private readonly mockExamQuestionComment: Repository<MockExamQuestionComment>,
    @InjectRepository(MockExamQuestion)
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  async editMockExamQuestionCommentLike(
    editMockExamQuestionCommentLikeInput: EditMockExamQuestionCommentLikeInput,
    user: User,
  ): Promise<EditMockExamQuestionCommentLikeOutput> {
    try {
      const { commentId } = editMockExamQuestionCommentLikeInput;
      const comment = await this.mockExamQuestionComment.findOne({
        where: {
          id: commentId,
        },
      });
      if (!comment) {
        return {
          ok: false,
          error: '존재하지 않는 댓글입니다.',
        };
      }
      const prevLike = await this.mockExamQuestionCommentLike.findOne({
        where: {
          user: {
            id: user.id,
          },
          comment: {
            id: commentId,
          },
        },
      });
      if (prevLike) {
        await this.mockExamQuestionCommentLike.delete({ id: prevLike.id });
        return {
          ok: true,
          currentState: false,
        };
      }
      const newLike = this.mockExamQuestionCommentLike.create({
        user,
        comment,
      });
      await this.mockExamQuestionCommentLike.save(newLike);
      return {
        ok: true,
        currentState: true,
      };
    } catch {
      return {
        ok: false,
        error: '좋아요 요청에 실패했습니다.',
      };
    }
  }

  async readMockExamQuestionCommentLikesByQuestinId(
    readMockExamQuestionCommentLikesByQuestinIdInput: ReadMockExamQuestionCommentLikesByQuestinIdInput,
  ): Promise<ReadMockExamQuestionCommentLikesByQuestinIdOutput> {
    try {
      const { commentId } = readMockExamQuestionCommentLikesByQuestinIdInput;
      const [likes, count] =
        await this.mockExamQuestionCommentLike.findAndCount({
          where: {
            comment: { id: commentId },
          },
        });
      return {
        count,
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
