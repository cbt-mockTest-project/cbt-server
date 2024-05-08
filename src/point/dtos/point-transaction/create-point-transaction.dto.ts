import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { PointTransaction } from 'src/point/entities/point-transaction.entity';

@InputType()
export class CreatePointTransactionInput extends PickType(PointTransaction, [
  'point',
  'type',
  'description',
]) {}

@ObjectType()
export class CreatePointTransactionOutput extends CoreOutput {}
