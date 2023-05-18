import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { User } from 'src/users/entities/user.entity';
import { Bootpay } from '@bootpay/backend-js';
import {
  CreatePaymentInput,
  CreatePaymentOutput,
} from './dtos/createPayment.dto';
import {
  UpdatePaymentInput,
  UpdatePaymentOutput,
} from './dtos/updatePayment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly payments: Repository<Payment>,
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  async createPayment(
    createPaymentInput: CreatePaymentInput,
    user: User,
  ): Promise<CreatePaymentOutput> {
    try {
      const { orderId, productName, receiptId, price } = createPaymentInput;
      const newPayment = this.payments.create({
        orderId,
        productName,
        receiptId,
        price,
        user,
      });
      const payment = await this.payments.save(newPayment);
      return {
        ok: true,
        payment,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: 'Could not create payment',
      };
    }
  }

  async updatePayment(
    updatePaymentInput: UpdatePaymentInput,
  ): Promise<UpdatePaymentOutput> {
    try {
      Bootpay.setConfiguration({
        application_id: process.env.BOOTPAY_APPLICATION_KEY,
        private_key: process.env.BOOTPAY_PRIVATE_KEY,
      });
      await Bootpay.getAccessToken();
      const { receiptId, paymentId } = updatePaymentInput;
      const { receipt_url } = await Bootpay.receiptPayment(receiptId);
      const payment = await this.payments.findOne({ where: { id: paymentId } });
      if (!payment) {
        return {
          ok: false,
          error: 'Payment not found',
        };
      }
      await this.payments.save({
        id: paymentId,
        receiptUrl: receipt_url,
      });
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: 'Could not update payment',
      };
    }
  }
}
