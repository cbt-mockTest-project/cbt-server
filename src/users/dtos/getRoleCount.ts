import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class GetRoleCountInput {
  @Field(() => Number)
  roleId: number;
}

@ObjectType()
export class GetRoleCountOutput extends CoreOutput {
  @Field(() => Number, { nullable: true })
  count?: number;
}
