import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { User } from 'src/users/entities/user.entity';
import { PaymentService } from './payment.service';
import { PaymentResolver } from './payment.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, User])],
  providers: [PaymentService, PaymentResolver],
})
export class PaymentsModule {}
