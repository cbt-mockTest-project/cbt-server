import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Item } from '../entities/item.entity';

@InputType()
export class CreateItemInput extends PickType(Item, [
  'price',
  'thumbnail',
  'filePath',
  'title',
  'description',
]) {}

@ObjectType()
export class CreateItemOutput extends CoreOutput {}
