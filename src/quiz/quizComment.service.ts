import {
  EditQuizCommentInput,
  EditQuizCommentOutput,
} from './dtos/editQuizComment.dto';
import { User } from 'src/users/entities/user.entity';
import {
  CreateQuizCommentInput,
  CreateQuizCommentOutput,
} from './dtos/createQuizComment.dto';
import { Quiz } from './entities/quiz.entity';
import { QuizComment } from './entities/quizComment.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  DeleteQuizCommentInput,
  DeleteQuizCommentOutput,
} from './dtos/deleteQuizComment.dto';

@Injectable()
export class QuizCommentSerivce {
  constructor(
    @InjectRepository(QuizComment)
    private readonly quizComment: Repository<QuizComment>,
    @InjectRepository(Quiz)
    private readonly quiz: Repository<Quiz>,
  ) {}

  async createQuizComment(
    createQuizCommentInput: CreateQuizCommentInput,
    user: User,
  ): Promise<CreateQuizCommentOutput> {
    try {
      const { quizId, content } = createQuizCommentInput;

      const quiz = await this.quiz.findOne({
        where: { id: quizId },
        relations: {
          comment: {
            user: true,
          },
        },
      });
      if (!quiz) {
        return {
          ok: false,
          error: '존재하지 않는 게시글입니다.',
        };
      }
      const isExist = quiz.comment.find(
        (comment) => comment.user.id === user.id,
      );
      if (isExist) {
        return {
          ok: false,
          error: '이미 정답을 제출했습니다.',
        };
      }
      const comment = this.quizComment.create({
        content,
        quiz,
        user,
      });
      await this.quizComment.save(comment);
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

  async editQuizComment(
    editQuizCommentInput: EditQuizCommentInput,
    user: User,
  ): Promise<EditQuizCommentOutput> {
    try {
      const { id, content } = editQuizCommentInput;
      const prevComment = await this.quizComment.findOne({
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
      await this.quizComment.save([prevComment]);
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

  async deleteQuizComment(
    deleteQuizCommentInput: DeleteQuizCommentInput,
    user: User,
  ): Promise<DeleteQuizCommentOutput> {
    try {
      const { id } = deleteQuizCommentInput;
      const Comment = await this.quizComment.findOne({
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
      this.quizComment.delete({ id });
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
