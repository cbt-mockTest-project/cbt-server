import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CreatePaymentInput } from 'src/payments/dtos/createPayment.dto';
import { ChangeClientRoleInput } from './changeClientRole.dto';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class ChangeClientRoleAndCreatePaymentInput {
  @Field(() => CreatePaymentInput)
  createPaymentInput: CreatePaymentInput;
  @Field(() => ChangeClientRoleInput)
  changeClientRoleInput: ChangeClientRoleInput;
}

@ObjectType()
export class ChangeClientRoleAndCreatePaymentOutput extends CoreOutput {
  @Field(() => Number, { nullable: true })
  paymentId?: number;
}
