import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { DiscountCodeStatus } from '../discount-code.entity';

@InputType()
export class UpdateDiscountCodeInput {
  @Field(() => String)
  code: string;

  @Field(() => DiscountCodeStatus)
  status: DiscountCodeStatus;
}

@ObjectType()
export class UpdateDiscountCodeOutput extends CoreOutput {}
