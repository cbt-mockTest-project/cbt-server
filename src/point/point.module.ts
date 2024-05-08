import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PointTransaction } from './entities/point-transaction.entity';
import { PointBalance } from './entities/point-balance.entity';
import { PointTransactionService } from './point-transaction.service';
import { PointTransactionResolver } from './point-transaction.resolver';
import { PointBalanceService } from './point-balance.service';
import { PointBalanceResolver } from './point-balance.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([PointTransaction, PointBalance])],
  providers: [
    PointTransactionService,
    PointTransactionResolver,
    PointBalanceService,
    PointBalanceResolver,
  ],
})
export class PointModule {}
