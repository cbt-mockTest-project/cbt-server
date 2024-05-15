import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { PointTransaction } from 'src/point/entities/point-transaction.entity';

@InputType()
export class CreatePointTransactionForAdminInput extends PickType(
  PointTransaction,
  ['point', 'type', 'description'],
) {
  @Field(() => String)
  email: string;
}

@ObjectType()
export class CreatePointTransactionForAdminOutput extends CoreOutput {
  @Field(() => PointTransaction, { nullable: true })
  pointTransaction?: PointTransaction;
}
