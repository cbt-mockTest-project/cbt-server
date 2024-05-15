import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { PointTransaction } from 'src/point/entities/point-transaction.entity';

@InputType()
export class GetPointTransactionsForAdminInput {
  @Field(() => String)
  email: string;
}

@ObjectType()
export class GetPointTransactionsForAdminOutput extends CoreOutput {
  @Field(() => [PointTransaction], { nullable: true, defaultValue: [] })
  pointTransactions?: PointTransaction[];
}
