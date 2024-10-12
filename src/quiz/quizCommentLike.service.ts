import { User } from 'src/users/entities/user.entity';
import { QuizComment } from './entities/quizComment.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizCommentLike } from './entities/quizCommentLike.entity';
import {
  EditQuizCommentLikeOutput,
  EditQuizCommentLikeInput,
} from './dtos/editQuizCommentLike.dto';

@Injectable()
export class QuizCommentLikeService {
  constructor(
    @InjectRepository(QuizCommentLike)
    private readonly quizCommentLike: Repository<QuizCommentLike>,
    @InjectRepository(QuizComment)
    private readonly comment: Repository<QuizComment>,
  ) {}

  async editQuizCommentLike(
    editQuizCommentLikeInput: EditQuizCommentLikeInput,
    user: User,
  ): Promise<EditQuizCommentLikeOutput> {
    try {
      const { commentId } = editQuizCommentLikeInput;
      const comment = await this.comment.findOne({
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
      const prevLike = await this.quizCommentLike.findOne({
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
        await this.quizCommentLike.delete({ id: prevLike.id });
        return {
          ok: true,
          currentState: false,
        };
      }
      const newLike = this.quizCommentLike.create({
        user,
        comment,
      });
      await this.quizCommentLike.save(newLike);
      return {
        ok: true,
        currentState: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: '좋아요 요청에 실패했습니다.',
      };
    }
  }
}
