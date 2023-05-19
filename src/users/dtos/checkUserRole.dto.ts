import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { UserRole } from '../entities/user.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class CheckUserRoleInput {
  @Field(() => [Number])
  roleIds: number[];
}

@ObjectType()
export class CheckUserRoleOutput extends CoreOutput {
  @Field(() => Boolean)
  confirmed: boolean;
}
