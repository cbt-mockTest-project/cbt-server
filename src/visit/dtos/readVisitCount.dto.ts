import { CoreOutput } from './../../common/dtos/output.dto';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ReadVisitCountOutput extends CoreOutput {
  @Field(() => Number, { nullable: true })
  count?: number;
}
