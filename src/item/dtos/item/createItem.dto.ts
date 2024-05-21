import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Item } from '../../entities/item.entity';

@InputType()
export class CreateItemInput extends PickType(Item, [
  'price',
  'thumbnail',
  'file',
  'title',
  'description',
  'contents',
  'urlSlug',
]) {
  @Field(() => Number, { nullable: true })
  categoryId?: number;
}

@ObjectType()
export class CreateItemOutput extends CoreOutput {}
