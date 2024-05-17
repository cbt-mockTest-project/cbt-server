import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { PointTransaction } from 'src/point/entities/point-transaction.entity';

@InputType()
export class GetPointTransactionsInput {}

@ObjectType()
export class GetPointTransactionsOutput extends CoreOutput {
  @Field(() => [PointTransaction], { nullable: true, defaultValue: [] })
  pointTransactions?: PointTransaction[];
}
