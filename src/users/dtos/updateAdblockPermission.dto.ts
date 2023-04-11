import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class UpdateAdblockPermissionInput {
  @Field(() => Number)
  userId: number;
}

@ObjectType()
export class UpdateAdblockPermissionOutput extends CoreOutput {
  @Field(() => Boolean, { nullable: true })
  adblockPermission?: boolean;
}
