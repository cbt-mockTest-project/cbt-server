import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PointBalance } from './entities/point-balance.entity';

@Injectable()
export class PointBalanceService {
  constructor(
    @InjectRepository(PointBalance)
    private readonly: Repository<PointBalance>,
  ) {}
}
