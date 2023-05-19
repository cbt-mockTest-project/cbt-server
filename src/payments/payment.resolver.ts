import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payment.service';
import {
  UpdatePaymentInput,
  UpdatePaymentOutput,
} from './dtos/updatePayment.dto';
import { Role } from 'src/auth/role.decorators';
import {
  DeletePaymentInput,
  DeletePaymentOutput,
} from './dtos/deletePayment.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { GetMyPaymentsOutput } from './dtos/getMyPayments.dto';
import {
  CreatePaymentInput,
  CreatePaymentOutput,
} from './dtos/createPayment.dto';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Role(['ANY'])
  @Mutation(() => UpdatePaymentOutput)
  async updatePayment(
    @Args('input')
    updatePaymentInput: UpdatePaymentInput,
  ): Promise<UpdatePaymentOutput> {
    return this.paymentService.updatePayment(updatePaymentInput);
  }

  @Role(['ANY'])
  @Mutation(() => DeletePaymentOutput)
  async deletePayment(
    @AuthUser() user: User,
    @Args('input') deletePaymentInput: DeletePaymentInput,
  ): Promise<DeletePaymentOutput> {
    return this.paymentService.deletePayment(deletePaymentInput, user);
  }

  @Role(['ANY'])
  @Query(() => GetMyPaymentsOutput)
  async getMyPayments(@AuthUser() user: User): Promise<GetMyPaymentsOutput> {
    return this.paymentService.getMyPayments(user);
  }

  @Role(['ANY'])
  @Mutation(() => CreatePaymentOutput)
  async createPayment(
    @AuthUser() user: User,
    @Args('input') createPaymentInput: CreatePaymentInput,
  ): Promise<CreatePaymentOutput> {
    return this.paymentService.createPayment(createPaymentInput, user);
  }
}
