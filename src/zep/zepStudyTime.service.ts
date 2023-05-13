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
      const { studyTime, grassCount, zepId, date } = updateZepStudyTimeInput;
      const zepUser = await this.zepUser.findOne({ where: { zep_id: zepId } });
      if (!zepUser) {
        return {
          ok: false,
          error: '유저를 찾을 수 없습니다.',
        };
      }

      const studyTimeToday = await this.zepStudyTime.findOne({
        where: { zepUser: { zep_id: zepId }, date },
      });
      const zepStudyTime = await this.zepStudyTime.save({
        id: studyTimeToday && studyTimeToday.id,
        zepUser,
        grass_count: grassCount,
        study_time: studyTime,
        date,
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
