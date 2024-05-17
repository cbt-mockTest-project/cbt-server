import { TypeOrmModule } from '@nestjs/typeorm';
import { Global, Module } from '@nestjs/common';
import { PointTransaction } from './entities/point-transaction.entity';
import { PointBalance } from './entities/point-balance.entity';
import { PointTransactionService } from './point-transaction.service';
import { PointTransactionResolver } from './point-transaction.resolver';
import { PointBalanceService } from './point-balance.service';
import { PointBalanceResolver } from './point-balance.resolver';
import { CategoryPointHistory } from './entities/category-point-history.entity';
import { CategoryPointHistoryService } from './category-point-history.service';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';
import { CategoryPointHistoryResolver } from './category-point-history.resolver';
import { SettlementRequest } from './entities/settlement-request.entity';
import { SettlementRequestResolver } from './settlement-request.resolver';
import { SettlementRequestService } from './settlement-request.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      PointTransaction,
      PointBalance,
      CategoryPointHistory,
      MockExamCategory,
      SettlementRequest,
    ]),
  ],
  providers: [
    PointTransactionService,
    PointTransactionResolver,
    PointBalanceService,
    PointBalanceResolver,
    CategoryPointHistoryService,
    CategoryPointHistoryResolver,
    SettlementRequestResolver,
    SettlementRequestService,
  ],
  exports: [
    PointTransactionService,
    PointBalanceService,
    CategoryPointHistoryService,
  ],
})
export class PointModule {}
