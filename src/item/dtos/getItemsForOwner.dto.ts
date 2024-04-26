import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Item } from '../entities/item.entity';

@InputType()
export class GetItemsForOwnerInput {}

@ObjectType()
export class GetItemsForOwnerOutput extends CoreOutput {
  @Field(() => [Item], { nullable: true, defaultValue: [] })
  items?: Item[];
}
