import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class CreateUserRoleInput {
  @Field(() => Number)
  userId: number;
  @Field(() => Number)
  roleId: number;
}

@ObjectType()
export class CreateUserRoleOutput extends CoreOutput {
  @Field(() => Number, { nullable: true })
  roleId?: number;
}
