import { MockExamQuestion } from '../exam/entities/mock-exam-question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulerService } from './scheduler.service';
import { Module } from '@nestjs/common';
import { VisitService } from 'src/visit/visit.service';
import { Visit } from 'src/visit/entities/visit.entity';
import { VisitHistory } from 'src/visit/entities/visitHistory.entity';
import { UserService } from 'src/users/user.service';
import { User } from 'src/users/entities/user.entity';
import { Verification } from 'src/users/entities/verification.entity';
import { Feedback } from 'src/users/entities/feedback.entity';
import { UserAndRole } from 'src/users/entities/userAndRole.entity';
import { Role } from 'src/users/entities/role.entity';
import { NoticeService } from 'src/users/notice.service';
import { PaymentService } from 'src/payments/payment.service';
import { Notice } from 'src/users/entities/notice.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { RevalidateModule } from 'src/revalidate/revalidate.module';
import { MockExamQuestionFeedbackSerivce } from 'src/exam/mock-exams-question-feedback.service';
import { MockExamQuestionFeedback } from 'src/exam/entities/mock-exam-question-feedback.entity';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';
import { MockExam } from 'src/exam/entities/mock-exam.entity';
import { CoupangService } from 'src/modu-shop/coupang/coupang.service';
import { Product } from 'src/modu-shop/coupang/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MockExam,
      MockExamQuestion,
      Visit,
      VisitHistory,
      User,
      Verification,
      Feedback,
      UserAndRole,
      Role,
      Notice,
      Payment,
      MockExamQuestionFeedback,
      MockExamCategory,
      Product,
    ]),
  ],
  providers: [
    CoupangService,
    SchedulerService,
    VisitService,
    UserService,
    NoticeService,
    PaymentService,
    RevalidateModule,
    MockExamQuestionFeedbackSerivce,
  ],
})
export class SchedulerModule {}
