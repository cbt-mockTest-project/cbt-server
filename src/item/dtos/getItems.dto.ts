import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Item } from '../entities/item.entity';

@InputType()
export class GetItemsInput {
  @Field(() => Number)
  page: number;

  @Field(() => Number)
  limit: number;

  @Field(() => String, { nullable: true })
  search?: string;
}

@ObjectType()
export class GetItemsOutput extends CoreOutput {
  @Field(() => [Item], { nullable: true, defaultValue: [] })
  items?: Item[];
}
