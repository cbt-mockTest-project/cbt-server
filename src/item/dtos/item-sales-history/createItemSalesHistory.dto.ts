import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { CreatePaymentInput } from 'src/payments/dtos/createPayment.dto';

@InputType()
export class CreateItemSalesHistoryInput extends CreatePaymentInput {
  @Field(() => Number)
  itemId: number;
}

@ObjectType()
export class CreateItemSalesHistoryOutput extends CoreOutput {}
