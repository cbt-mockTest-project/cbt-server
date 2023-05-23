import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class ClearFreeTrialRoleInput {}

@ObjectType()
export class ClearFreeTrialRoleOutput extends CoreOutput {
  @Field(() => Number, { defaultValue: 0 })
  count?: number;
}
