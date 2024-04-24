import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seceders } from './entities/seceders.entity';
import { Repository } from 'typeorm';
import {
  CreateSecederInput,
  CreateSecederOutput,
} from './dtos/createSeceder.dto';
import { GetSecederInput, GetSecederOutput } from './dtos/getSeceder.dto.';

@Injectable()
export class SecedersService {
  constructor(
    @InjectRepository(Seceders) private readonly seceders: Repository<Seceders>,
  ) {}
  async createSeceder(
    createSecederInput: CreateSecederInput,
  ): Promise<CreateSecederOutput> {
    try {
      const newSeceder = this.seceders.create(createSecederInput);
      await this.seceders.save(newSeceder);
      return { ok: true };
    } catch {
      return { ok: false, error: 'Could not create seceder' };
    }
  }

  async getSeceder(
    getSecederInput: GetSecederInput,
  ): Promise<GetSecederOutput> {
    try {
      const seceder = await this.seceders.findOne({
        where: {
          email: getSecederInput.email,
        },
      });
      if (!seceder) {
        return { ok: false, error: 'Seceder not found' };
      }
      return { ok: true, seceder };
    } catch {
      return { ok: false, error: 'Could not get seceder' };
    }
  }
}
