import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from 'src/users/entities/user.entity';
import { Notice } from './entities/notice.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoticeInput, CreateNoticeOutput } from './dtos/createNotice.dto';
import { EditNoticeInput, EditNoticeOutput } from './dtos/editNotice.dto';
import { ReadMyNoticeOutput } from './dtos/readMyNotice.dto';
import { DeleteNoticeInput, DeleteNoticeOutput } from './dtos/deleteNotice.dto';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private readonly notice: Repository<Notice>,
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {}

  async createNotice(
    createNoticeInput: CreateNoticeInput,
  ): Promise<CreateNoticeOutput> {
    try {
      const { content, reservationTime, userId } = createNoticeInput;
      const newNotice = this.notice.create({
        content,
        reservationTime: reservationTime || null,
        confirm: false,
        user: { id: userId },
      });
      await this.notice.save(newNotice);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '알림을 만들 수 없습니다.',
      };
    }
  }

  async editNotice(
    editNoticeInput: EditNoticeInput,
  ): Promise<EditNoticeOutput> {
    try {
      const { content, noticeId, reservationTime, confirm } = editNoticeInput;
      const prevNotice = await this.notice.findOne({ where: { id: noticeId } });
      if (!prevNotice) {
        return {
          ok: false,
          error: '존재하지 않는 알림입니다.',
        };
      }
      const newNotice = {
        ...prevNotice,
        content,
        reservationTime,
        confirm,
      };
      await this.notice.save(newNotice);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '알림을 수정할 수 없습니다.',
      };
    }
  }

  async deleteNotice(
    deleteNoticeInput: DeleteNoticeInput,
  ): Promise<DeleteNoticeOutput> {
    try {
      const { noticeId } = deleteNoticeInput;
      await this.notice.delete({ id: noticeId });
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '알림을 삭제할 수 없습니다.',
      };
    }
  }

  async readMyNotice(user: User): Promise<ReadMyNoticeOutput> {
    try {
      const notices = await this.notice.find({
        where: {
          user: { id: user.id },
        },
        order: { confirm: 'ASC', created_at: 'DESC' },
      });
      console.log(notices);
      return {
        ok: true,
        notices,
      };
    } catch {
      return {
        ok: false,
        error: '알림을 불러올 수 없습니다.',
      };
    }
  }

  async deleteAllNoticesOfMe(user: User): Promise<CoreOutput> {
    try {
      await this.notice.delete({ user: { id: user.id } });
      return { ok: true };
    } catch {
      return { ok: false, error: '알림을 삭제할 수 없습니다.' };
    }
  }
}
