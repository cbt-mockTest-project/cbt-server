import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class CheckDiscountCodeInput {
  @Field(() => String)
  code: string;
}

@ObjectType()
export class CheckDiscountCodeOutput extends CoreOutput {}
