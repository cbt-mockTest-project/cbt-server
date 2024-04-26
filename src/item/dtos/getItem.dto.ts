import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Item } from '../entities/item.entity';

@InputType()
export class GetItemInput {
  @Field(() => Number)
  id: number;
}

@ObjectType()
export class GetItemOutput extends CoreOutput {
  @Field(() => Item, { nullable: true })
  item?: Item;
}
