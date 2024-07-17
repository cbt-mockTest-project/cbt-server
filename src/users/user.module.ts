import { NoticeResolver } from './notice.resolver';
import { Feedback } from './entities/feedback.entity';
import { Verification } from './entities/verification.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Notice } from './entities/notice.entity';
import { NoticeService } from './notice.service';
import { UserController } from './user.controller';
import { PaymentService } from 'src/payments/payment.service';
import { Payment } from 'src/payments/entities/payment.entity';
import { UserAndRole } from './entities/userAndRole.entity';
import { Role } from './entities/role.entity';
import {
  ExamCategoryRole,
  MockExamCategory,
} from 'src/exam-category/entities/mock-exam-category.entity';
import { Seller } from 'src/seller/entities/seller.entity';
import { CategoryEvaluation } from 'src/category-evaluation/entities/category-evaluation.entity';
import { Seceders } from 'src/seceders/entities/seceders.entity';
import { SecedersService } from 'src/seceders/seceders.service';
import { TextHighlight } from 'src/text-highlight/entites/text-highlight.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Verification,
      Feedback,
      Notice,
      Payment,
      UserAndRole,
      Role,
      ExamCategoryRole,
      MockExamCategory,
      Seller,
      CategoryEvaluation,
      Seceders,
      TextHighlight,
    ]),
  ],
  providers: [
    UserResolver,
    UserService,
    NoticeResolver,
    NoticeService,
    PaymentService,
    SecedersService,
  ],
  exports: [UserService, NoticeService],
  controllers: [UserController],
})
export class UserModule {}
