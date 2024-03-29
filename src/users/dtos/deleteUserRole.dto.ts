import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class DeleteUserRoleInput {
  @Field(() => Number)
  id: number;
}

@ObjectType()
export class DeleteUserRoleOutput extends CoreOutput {}
