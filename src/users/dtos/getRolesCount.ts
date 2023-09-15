import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class GetRolesCountInput {
  @Field(() => [Number])
  roleIds: number[];
}

@ObjectType()
export class GetRolesCountOutput extends CoreOutput {
  @Field(() => Number, { nullable: true })
  count?: number;
}
