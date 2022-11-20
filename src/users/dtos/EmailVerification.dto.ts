import { CoreOutput } from './../../common/dtos/output.dto';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Verification } from '../entities/verification.entity';

@InputType()
export class EmailVerificationInput extends PickType(Verification, ['code']) {}

@ObjectType()
export class EmailVerificationOutput extends CoreOutput {
  @Field(() => String)
  email?: string;
}
