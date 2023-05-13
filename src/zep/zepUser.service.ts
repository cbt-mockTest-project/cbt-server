import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ZepUser } from './entities/zepUser.entity';
import { Repository } from 'typeorm';
import {
  UpdateZepUserInput,
  UpdateZepUserOutput,
} from './dtos/zepUser/updateZepUser.dto';
import { GetZepUserOutput } from './dtos/zepUser/getZepUser.dto';

@Injectable()
export class ZepUserService {
  constructor(
    @InjectRepository(ZepUser)
    private readonly zepUser: Repository<ZepUser>,
  ) {}

  async updateZepUser(
    updateZepUserInput: UpdateZepUserInput,
  ): Promise<UpdateZepUserOutput> {
    try {
      const { nickname, zepId } = updateZepUserInput;
      const prevZepUser = await this.zepUser.findOne({
        where: { zep_id: zepId },
      });
      const newUser = prevZepUser
        ? this.zepUser.create({
            nickname,
            zep_id: zepId,
            id: prevZepUser.id,
          })
        : this.zepUser.create({
            nickname,
            zep_id: zepId,
          });

      const zepUser = await this.zepUser.save(newUser);
      return {
        zepUser,
        ok: true,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: '업데이트에 실패했습니다.',
      };
    }
  }

  async getZepUser(id: string): Promise<GetZepUserOutput> {
    try {
      const zepUser = await this.zepUser.findOne({
        where: { zep_id: id },
        relations: {
          studyTimes: true,
        },
      });
      if (!zepUser) {
        return {
          ok: false,
          error: '유저를 찾을 수 없습니다.',
        };
      }
      return {
        ok: true,
        zepUser,
      };
    } catch {
      return {
        ok: false,
        error: '유저를 불러오지 못했습니다.',
      };
    }
  }
}
