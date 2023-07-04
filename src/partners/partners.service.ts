import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Partner } from './entities/partners.entity';
import { Repository } from 'typeorm';
import { GetPartnersOutput } from './dtos/getPartners.dto';

@Injectable()
export class PartnersService {
  constructor(
    @InjectRepository(Partner)
    private readonly partners: Repository<Partner>,
  ) {}

  async getPartners(): Promise<GetPartnersOutput> {
    try {
      const partners = await this.partners.find();
      return {
        ok: true,
        partners,
      };
    } catch {
      return {
        ok: false,
        error: '파트너들을 불러올 수 없습니다.',
      };
    }
  }
}
