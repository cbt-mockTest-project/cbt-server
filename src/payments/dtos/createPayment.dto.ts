import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Payment } from '../entities/payment.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class CreatePaymentInput extends PickType(Payment, [
  'price',
  'orderId',
  'productName',
  'receiptId',
]) {}

@ObjectType()
export class CreatePaymentOutput extends CoreOutput {
  @Field((type) => Payment, { nullable: true })
  payment?: Payment;
}
