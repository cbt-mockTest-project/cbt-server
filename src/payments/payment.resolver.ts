import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payment.service';
import {
  UpdatePaymentInput,
  UpdatePaymentOutput,
} from './dtos/updatePayment.dto';
import { Role } from 'src/auth/role.decorators';

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
}
