import { CoreOutput } from 'src/common/dtos/output.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class RevalidateInput {
  @Field(() => String)
  path: string;
}

@ObjectType()
export class RevalidateOutput extends CoreOutput {}
