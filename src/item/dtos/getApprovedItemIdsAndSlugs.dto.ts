import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class GetApprovedItemIdsAndsSlugsInput {}

@ObjectType()
export class GetApprovedItemIdsAndsSlugsOutput extends CoreOutput {
  @Field(() => [Number], { nullable: true })
  ids?: number[];

  @Field(() => [String], { nullable: true })
  slugs?: string[];
}
