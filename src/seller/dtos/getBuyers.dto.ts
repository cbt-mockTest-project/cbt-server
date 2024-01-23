import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { UserAndRole } from 'src/users/entities/userAndRole.entity';

@InputType()
export class GetBuyersInput {}

@ObjectType()
export class GetBuyersOutput extends CoreOutput {
  @Field(() => [UserAndRole], { nullable: true, defaultValue: [] })
  userAndRoles?: UserAndRole[];
}
