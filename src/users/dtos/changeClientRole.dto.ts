import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { UserRole } from '../entities/user.entity';

@InputType()
export class ChangeClientRoleInput {
  @Field(() => UserRole)
  role: UserRole;
}
