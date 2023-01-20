import { User } from 'src/users/entities/user.entity';
import { PostComment } from './entities/postComment.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostCommentLike } from './entities/postCommentLike.entity';
import {
  EditPostCommentLikeOutput,
  EditPostCommentLikeInput,
} from './dtos/editPostCommentLike.dto';

@Injectable()
export class PostCommentLikeService {
  constructor(
    @InjectRepository(PostCommentLike)
    private readonly postCommentLike: Repository<PostCommentLike>,
    @InjectRepository(PostComment)
    private readonly comment: Repository<PostComment>,
  ) {}

  async editPostCommentLike(
    editPostCommentLikeInput: EditPostCommentLikeInput,
    user: User,
  ): Promise<EditPostCommentLikeOutput> {
    try {
      const { commentId } = editPostCommentLikeInput;
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
      const prevLike = await this.postCommentLike.findOne({
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
        await this.postCommentLike.delete({ id: prevLike.id });
        return {
          ok: true,
          currentState: false,
        };
      }
      const newLike = this.postCommentLike.create({
        user,
        comment,
      });
      await this.postCommentLike.save(newLike);
      return {
        ok: true,
        currentState: true,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: '좋아요 요청에 실패했습니다.',
      };
    }
  }
}
