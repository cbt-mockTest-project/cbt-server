import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { SettlementRequest } from 'src/point/entities/settlement-request.entity';

@InputType()
export class CreateSettlementRequestInput extends PickType(SettlementRequest, [
  'accountHolder',
  'accountNumber',
  'bankName',
  'amount',
]) {}

@ObjectType()
export class CreateSettlementRequestOutput extends CoreOutput {}
