import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Visit } from './entities/visit.entity';
@Injectable()
export class VisitService {
  constructor(
    @InjectRepository(Visit) private readonly visit: Repository<Visit>,
  ) {}

  async createVisit(user: User): Promise<CoreOutput> {
    const newVisit = this.visit.create({ user });
    await this.visit.save(newVisit);
    return {
      ok: true,
    };
  }
}
