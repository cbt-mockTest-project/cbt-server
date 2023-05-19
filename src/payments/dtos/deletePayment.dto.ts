import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class DeletePaymentInput {
  @Field(() => Number)
  paymentId: number;
}

@ObjectType()
export class DeletePaymentOutput extends CoreOutput {}
