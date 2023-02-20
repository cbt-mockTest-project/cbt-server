import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { ReadVisitCountOutput } from './dtos/readVisitCount.dto';
import { Visit } from './entities/visit.entity';
@Injectable()
export class VisitService {
  constructor(
    @InjectRepository(Visit) private readonly visit: Repository<Visit>,
  ) {}

  async createVisit(user: User): Promise<CoreOutput> {
    try {
      const newVisit = this.visit.create({ user });
      await this.visit.save(newVisit);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'fail visit count',
      };
    }
  }

  async clearVisit(): Promise<CoreOutput> {
    try {
      await this.visit.clear();
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'fail visit clear',
      };
    }
  }

  async readVisitCount(): Promise<ReadVisitCountOutput> {
    try {
      const count = await this.visit.count();
      return {
        ok: true,
        count,
      };
    } catch {
      return {
        ok: false,
        error: 'fail read visit count',
      };
    }
  }
}
