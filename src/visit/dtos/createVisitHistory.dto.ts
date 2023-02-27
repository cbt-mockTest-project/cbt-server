import { CoreOutput } from './../../common/dtos/output.dto';
import { ObjectType, Field } from '@nestjs/graphql';
@ObjectType()
export class CreateVisitHistoryOutput extends CoreOutput {
  @Field(() => Number, { nullable: true })
  totalViewCount?: number;

  @Field(() => Number, { nullable: true })
  todayViewCount?: number;
}
