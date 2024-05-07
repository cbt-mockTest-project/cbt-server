import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class RequestDeleteItemInput {
  @Field(() => Number)
  itemId: number;
}

@ObjectType()
export class RequestDeleteItemOutput extends CoreOutput {}
