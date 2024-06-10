import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class CheckHasCategoryAccessInput {
  @Field(() => Number)
  categoryId: number;
}

@ObjectType()
export class CheckHasCategoryAccessOutput extends CoreOutput {}
