import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class UpdatePaymentInput {
  @Field(() => Number)
  paymentId: number;
  @Field(() => String)
  receiptId: string;
}

@ObjectType()
export class UpdatePaymentOutput extends CoreOutput {}
