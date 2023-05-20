import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ZepMapUserCount } from './entities/zepMapUserCount.entity';
import { GetZepMapUserCountOutput } from './dtos/zepMap/getZepMapUserCount';
import {
  UpdateZepMapUserCountInput,
  UpdateZepMapUserCountOutput,
} from './dtos/zepMap/updateZepMapUserCount';

@Injectable()
export class ZepMapService {
  constructor(
    @InjectRepository(ZepMapUserCount)
    private readonly zepMapUserCount: Repository<ZepMapUserCount>,
  ) {}

  async getZepMapUserCount(): Promise<GetZepMapUserCountOutput> {
    try {
      const zepMapUserCount = await this.zepMapUserCount.find();
      return {
        zepMapUserCount,
        ok: true,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: '유저 카운드 정보를 가져오는데 실패했습니다.',
      };
    }
  }

  async updateZepMapUserCount(
    updateZepMapUserCountInput: UpdateZepMapUserCountInput,
  ): Promise<UpdateZepMapUserCountOutput> {
    try {
      const { mapId, userCount } = updateZepMapUserCountInput;
      const prevZepMapUserCount = await this.zepMapUserCount.findOne({
        where: { mapId },
      });
      const newZepMapUserCount = prevZepMapUserCount
        ? {
            ...prevZepMapUserCount,
            userCount,
          }
        : this.zepMapUserCount.create({
            mapId,
            userCount,
          });

      const zepMapUserCount = await this.zepMapUserCount.save(
        newZepMapUserCount,
      );
      return {
        zepMapUserCount,
        ok: true,
      };
    } catch {}
  }
}
