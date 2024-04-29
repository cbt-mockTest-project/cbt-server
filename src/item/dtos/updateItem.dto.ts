import { InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Item } from '../entities/item.entity';

@InputType()
export class UpdateItemInput extends PartialType(
  PickType(Item, ['price', 'thumbnail', 'file', 'title', 'description', 'id']),
) {}

@ObjectType()
export class UpdateItemOutput extends CoreOutput {}
