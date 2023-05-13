import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ZepUser } from './entities/zepUser.entity';
import { Repository } from 'typeorm';
import { ZepStudyTime } from './entities/zepStudyTime.entity';
import {
  UpdateZepStudyTimeInput,
  UpdateZepStudyTimeOutput,
} from './dtos/zepStudyTime/updateZepStudyTime.dto';

@Injectable()
export class ZepStudyTimeService {
  constructor(
    @InjectRepository(ZepUser)
    private readonly zepUser: Repository<ZepUser>,
    @InjectRepository(ZepStudyTime)
    private readonly zepStudyTime: Repository<ZepStudyTime>,
  ) {}

  async updateZepStudyTime(
    updateZepStudyTimeInput: UpdateZepStudyTimeInput,
  ): Promise<UpdateZepStudyTimeOutput> {
    try {
      const { studyTime, grassCount, zepId } = updateZepStudyTimeInput;
      const zepUser = await this.zepUser.findOne({ where: { zep_id: zepId } });
      if (!zepUser) {
        return {
          ok: false,
          error: '유저를 찾을 수 없습니다.',
        };
      }
      // 오늘 만들어진 스터디 타임이 있는지 확인
      const today = new Date();
      const startOfDay = new Date(today.setHours(0, 0, 0, 0));
      const endOfDay = new Date(today.setHours(23, 59, 59, 999));
      const studyTimeToday = await this.zepStudyTime
        .createQueryBuilder('zepStudyTime')
        .where('zepStudyTime.zepUser.id = :zepUserId', {
          zepUserId: zepUser.id,
        })
        .andWhere('zepStudyTime.updated_at >= :startOfDay', { startOfDay })
        .andWhere('zepStudyTime.updated_at <= :endOfDay', { endOfDay })
        .getOne();
      const zepStudyTime = await this.zepStudyTime.save({
        id: studyTimeToday && studyTimeToday.id,
        zepUser,
        grass_count: grassCount,
        study_time: studyTime,
      });
      return {
        ok: true,
        zepStudyTime,
      };
    } catch (e) {
      return {
        ok: false,
        error: '업데이트에 실패했습니다.',
      };
    }
  }
}
