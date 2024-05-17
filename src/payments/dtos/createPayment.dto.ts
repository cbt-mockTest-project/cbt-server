import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Payment } from '../entities/payment.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { CreateCategoryPointHistoryInput } from 'src/point/dtos/category-point-history/create-category-point-history.dto';

@InputType()
export class CreatePaymentInput extends PickType(Payment, [
  'price',
  'orderId',
  'productName',
  'receiptId',
]) {
  @Field(() => CreateCategoryPointHistoryInput, { nullable: true })
  createCategoryPointHistoryInput?: CreateCategoryPointHistoryInput;
}

@ObjectType()
export class CreatePaymentOutput extends CoreOutput {
  @Field((type) => Payment, { nullable: true })
  payment?: Payment;
}
