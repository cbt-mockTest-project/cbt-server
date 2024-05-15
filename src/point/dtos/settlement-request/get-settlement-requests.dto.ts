import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { SettlementRequest } from 'src/point/entities/settlement-request.entity';

@InputType()
export class GetSettlementRequestsInput {}

@ObjectType()
export class GetSettlementRequestsOutput extends CoreOutput {
  @Field(() => [SettlementRequest], { nullable: true })
  settlementRequests?: SettlementRequest[];
}
