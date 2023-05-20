import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ZepMapUserCount } from 'src/zep/entities/zepMapUserCount.entity';

@InputType()
export class UpdateZepMapUserCountInput extends PickType(ZepMapUserCount, [
  'mapId',
  'userCount',
]) {}

@ObjectType()
export class UpdateZepMapUserCountOutput extends CoreOutput {
  @Field(() => ZepMapUserCount, { nullable: true })
  zepMapUserCount?: ZepMapUserCount;
}
