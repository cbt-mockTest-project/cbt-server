import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ObjectType()
export class ReadVisitHistoryOutput extends CoreOutput {
  @Field(() => Number, { nullable: true })
  today?: number;
  @Field(() => Number, { nullable: true })
  yesterday?: number;
  @Field(() => Number, { nullable: true })
  total?: number;
}
