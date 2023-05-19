import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
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
import { GetMyPaymentsOutput } from './dtos/getMyPayments.dto';
import {
  DeletePaymentInput,
  DeletePaymentOutput,
} from './dtos/deletePayment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly payments: Repository<Payment>,
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  async getMyPayments(user: User): Promise<GetMyPaymentsOutput> {
    try {
      const payments = await this.payments.find({
        where: {
          user: {
            id: user.id,
          },
        },
      });
      return {
        ok: true,
        payments,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not get payments',
      };
    }
  }

  async deletePayment(
    deletePaymentInput: DeletePaymentInput,
    user: User,
  ): Promise<DeletePaymentOutput> {
    try {
      const { paymentId } = deletePaymentInput;
      const payment = await this.payments.findOne({
        where: {
          id: paymentId,
        },
        relations: {
          user: true,
        },
      });
      if (!payment) {
        return {
          ok: false,
          error: 'Payment not found',
        };
      }
      if (user.id !== payment.user.id) {
        return {
          ok: false,
          error: 'Not authorized',
        };
      }
      await this.payments.delete(paymentId);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not delete payment',
      };
    }
  }

  async createPayment(
    createPaymentInput: CreatePaymentInput,
    user: User,
    queryRunner?: QueryRunner,
  ): Promise<CreatePaymentOutput> {
    try {
      const { orderId, productName, receiptId, price } = createPaymentInput;
      Bootpay.setConfiguration({
        application_id: process.env.BOOTPAY_APPLICATION_KEY,
        private_key: process.env.BOOTPAY_PRIVATE_KEY,
      });
      await Bootpay.getAccessToken();
      const { receipt_url } = await Bootpay.receiptPayment(receiptId);
      const newPayment = this.payments.create({
        orderId,
        productName,
        receiptId,
        price,
        user,
        receiptUrl: receipt_url,
      });
      let payment: Payment;
      if (queryRunner) {
        payment = await queryRunner.manager.save(newPayment);
      } else {
        payment = await this.payments.save(newPayment);
      }

      return {
        ok: true,
        payment,
      };
    } catch (error) {
      if (queryRunner) {
        await queryRunner.rollbackTransaction();
      }
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
