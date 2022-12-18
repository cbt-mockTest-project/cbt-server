import { CoreOutput } from './../../common/dtos/output.dto';
import { Verification } from './../entities/verification.entity';
import { InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class SendFindPasswordMailInput extends PickType(Verification, [
  'email',
]) {}

@ObjectType()
export class SendFindPasswordMailOutput extends CoreOutput {}
