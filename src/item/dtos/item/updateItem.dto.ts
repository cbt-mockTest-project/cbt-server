import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Item } from '../../entities/item.entity';

@InputType()
export class UpdateItemInput extends PartialType(
  PickType(Item, [
    'price',
    'thumbnail',
    'file',
    'title',
    'description',
    'id',
    'contents',
  ]),
) {
  @Field((type) => Number, { nullable: true })
  categoryId?: number;
}

@ObjectType()
export class UpdateItemOutput extends CoreOutput {}
