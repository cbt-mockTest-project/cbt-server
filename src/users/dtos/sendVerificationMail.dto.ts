import { CoreOutput } from './../../common/dtos/output.dto';
import { Verification } from './../entities/verification.entity';
import { InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class SendVerificationMailInput extends PickType(Verification, [
  'email',
]) {}

@ObjectType()
export class SendVerificationMailOutput extends CoreOutput {}
