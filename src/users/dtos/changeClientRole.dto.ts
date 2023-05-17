import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { UserRole } from '../entities/user.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class ChangeClientRoleInput {
  @Field(() => UserRole)
  role: UserRole;
}

ObjectType();
export class ChangeClientRoleOutput extends CoreOutput {
  @Field(() => UserRole, { nullable: true })
  currentRole?: UserRole;
}
