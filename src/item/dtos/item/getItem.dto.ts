import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Item } from '../../entities/item.entity';

@InputType()
export class GetItemInput {
  @Field(() => Number, { nullable: true })
  id?: number;
  @Field(() => String, { nullable: true })
  urlSlug?: string;
}

@ObjectType()
export class GetItemOutput extends CoreOutput {
  @Field(() => Item, { nullable: true })
  item?: Item;
}
