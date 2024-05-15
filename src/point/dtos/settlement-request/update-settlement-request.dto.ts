import { InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { SettlementRequest } from 'src/point/entities/settlement-request.entity';

@InputType()
export class UpdateSettlementRequestInput extends PartialType(
  PickType(SettlementRequest, ['status', 'id']),
) {}

@ObjectType()
export class UpdateSettlementRequestOutput extends CoreOutput {}
