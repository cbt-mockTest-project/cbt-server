import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ZepMapUserCount } from '../../entities/zepMapUserCount.entity';

@InputType()
export class GetZepMapUserCountInput {}

@ObjectType()
export class GetZepMapUserCountOutput extends CoreOutput {
  @Field(() => [ZepMapUserCount], { nullable: true })
  zepMapUserCount?: ZepMapUserCount[];
}
