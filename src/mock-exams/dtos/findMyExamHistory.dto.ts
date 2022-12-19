import { CoreOutput } from './../../common/dtos/output.dto';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TitleAndId {
  @Field(() => Number, { nullable: true })
  id?: number;
  @Field(() => String, { nullable: true })
  title?: string;
}

@ObjectType()
export class FindMyExamHistoryOutput extends CoreOutput {
  @Field(() => [TitleAndId], { nullable: true })
  titleAndId?: TitleAndId[];
}
