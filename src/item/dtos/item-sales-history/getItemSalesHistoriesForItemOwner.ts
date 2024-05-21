import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ItemSalesHistory } from 'src/item/entities/item-sales-history.entity';

@InputType()
export class GetItemSalesHistoriesForItemOwnerInput {}

@ObjectType()
export class GetItemSalesHistoriesForItemOwnerOutput extends CoreOutput {
  @Field(() => [ItemSalesHistory], { nullable: true })
  itemSalesHistories?: ItemSalesHistory[];
}
