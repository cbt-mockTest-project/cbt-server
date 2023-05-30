import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ZepComment } from './entities/zepComment.entity';
import { Repository } from 'typeorm';
import { ZepPost } from './entities/zepPost.entity';
import { ZepUser } from './entities/zepUser.entity';
import {
  CreateZepCommentInput,
  CreateZepCommentOutput,
} from './dtos/zepComment/createZepComment.dto';
import {
  DeleteZepCommentInput,
  DeleteZepCommentOutput,
} from './dtos/zepComment/deleteZepComment.dto';
import {
  UpdateZepCommentInput,
  UpdateZepCommentOutput,
} from './dtos/zepComment/updateZepComment.dto';

@Injectable()
export class ZepCommentService {
  constructor(
    @InjectRepository(ZepComment)
    private readonly zepComment: Repository<ZepComment>,
    @InjectRepository(ZepPost)
    private readonly zepPost: Repository<ZepPost>,
    @InjectRepository(ZepUser)
    private readonly zepUser: Repository<ZepUser>,
  ) {}

  async createZepComment(
    createZepCommentInput: CreateZepCommentInput,
  ): Promise<CreateZepCommentOutput> {
    const { userId, postId, content } = createZepCommentInput;
    try {
      const zepUser = await this.zepUser.findOne({
        where: { zep_id: userId },
      });
      if (!zepUser) {
        return {
          ok: false,
          error: '존재하지 않는 유저입니다.',
        };
      }
      const zepPost = await this.zepPost.findOne({
        where: { id: postId },
      });
      if (!zepPost) {
        return {
          ok: false,
          error: '존재하지 않는 게시글입니다.',
        };
      }
      const comment = this.zepComment.create({
        content,
        zepUser,
        zepPost,
      });
      await this.zepComment.save(comment);
      return {
        ok: true,
        comment,
      };
    } catch (e) {
      return {
        ok: false,
        error: '댓글을 작성할 수 없습니다.',
      };
    }
  }

  async deleteZepComment(
    commentId: string,
    deleteZepCommentInput: DeleteZepCommentInput,
  ): Promise<DeleteZepCommentOutput> {
    const { userId } = deleteZepCommentInput;
    try {
      const zepUser = await this.zepUser.findOne({
        where: { zep_id: userId },
      });
      if (!zepUser) {
        return {
          ok: false,
          error: '존재하지 않는 유저입니다.',
        };
      }
      const zepComment = await this.zepComment.findOne({
        where: { id: Number(commentId) },
        relations: {
          zepUser: true,
        },
      });
      if (!zepComment) {
        return {
          ok: false,
          error: '존재하지 않는 댓글입니다.',
        };
      }
      if (zepComment.zepUser.id !== zepUser.id) {
        return {
          ok: false,
          error: '댓글을 삭제할 권한이 없습니다.',
        };
      }
      await this.zepComment.delete(commentId);
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: '댓글을 삭제할 수 없습니다.',
      };
    }
  }

  async updateZepComment(
    commentId: string,
    updateZepCommentInput: UpdateZepCommentInput,
  ): Promise<UpdateZepCommentOutput> {
    const { userId, content } = updateZepCommentInput;
    try {
      const zepUser = await this.zepUser.findOne({
        where: { zep_id: userId },
      });
      if (!zepUser) {
        return {
          ok: false,
          error: '존재하지 않는 유저입니다.',
        };
      }
      const zepComment = await this.zepComment.findOne({
        where: { id: Number(commentId) },
        relations: {
          zepUser: true,
        },
      });
      if (!zepComment) {
        return {
          ok: false,
          error: '존재하지 않는 댓글입니다.',
        };
      }
      if (zepComment.zepUser.id !== zepUser.id) {
        return {
          ok: false,
          error: '댓글을 수정할 권한이 없습니다.',
        };
      }
      zepComment.content = content;
      await this.zepComment.save(zepComment);
      return {
        ok: true,
        comment: zepComment,
      };
    } catch (e) {
      return {
        ok: false,
        error: e.message,
      };
    }
  }
}
