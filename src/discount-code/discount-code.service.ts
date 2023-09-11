import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DiscountCode,
  DiscountCodeStatus,
  DiscountCodeType,
} from './discount-code.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import {
  UpdateDiscountCodeInput,
  UpdateDiscountCodeOutput,
} from './dtos/updateDiscountCode.dto';
import { User } from 'src/users/entities/user.entity';
import {
  CheckDiscountCodeInput,
  CheckDiscountCodeOutput,
} from './dtos/checkDiscountCode.dto';

@Injectable()
export class DiscountCodeService {
  constructor(
    @InjectRepository(DiscountCode)
    private readonly discountCode: Repository<DiscountCode>,
  ) {}

  async createDiscountCode(): Promise<boolean> {
    try {
      const codes = [];
      for (let i = 0; i < 5000; i++) {
        codes.push(uuidv4().slice(0, 8));
      }
      const uniqueArr = Array.from(new Set(codes));
      await this.discountCode.save(
        uniqueArr.map((code) =>
          this.discountCode.create({ code, type: DiscountCodeType.EHS_MASTER }),
        ),
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  async updateDiscountCode(
    user: User,
    updateDiscountCodeInput: UpdateDiscountCodeInput,
  ): Promise<UpdateDiscountCodeOutput> {
    try {
      const { code, status } = updateDiscountCodeInput;
      await this.discountCode.update({ code }, { status, user });
      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        error: '쿠폰사용에 실패했습니다.',
      };
    }
  }

  async checkDiscountCode(
    checkDiscountCodeInput: CheckDiscountCodeInput,
  ): Promise<CheckDiscountCodeOutput> {
    const { code } = checkDiscountCodeInput;
    try {
      const discountCode = await this.discountCode.findOne({
        where: { code },
      });
      if (discountCode.status === DiscountCodeStatus.UNUSED) {
        return {
          ok: true,
        };
      }
      if (discountCode.status === DiscountCodeStatus.PENDING) {
        return {
          ok: false,
          error: '이미 사용중인 쿠폰입니다.',
        };
      }
      if (discountCode.status === DiscountCodeStatus.USED) {
        return {
          ok: false,
          error: '이미 사용된 쿠폰입니다.',
        };
      }
    } catch (e) {
      return {
        ok: false,
        error: '쿠폰을 찾을 수 없습니다.',
      };
    }
  }

  async test() {
    const res = await this.discountCode.find({
      where: {
        status: DiscountCodeStatus.UNUSED,
      },
      take: 100,
    });
    const result = res.map((code) => code.code);
    return result;
  }
}
