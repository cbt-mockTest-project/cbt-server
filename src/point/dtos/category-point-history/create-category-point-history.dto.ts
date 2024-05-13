import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { CreatePointTransactionInput } from '../point-transaction/create-point-transaction.dto';

@InputType()
export class CreateCategoryPointHistoryInput extends CreatePointTransactionInput {
  @Field(() => Number)
  categoryId: number;
}

@ObjectType()
export class CreateCategoryPointHistoryOutput extends CoreOutput {}
