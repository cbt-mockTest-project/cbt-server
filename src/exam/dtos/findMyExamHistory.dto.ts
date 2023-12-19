import { CoreOutput } from '../../common/dtos/output.dto';
import { Field, ObjectType, InputType } from '@nestjs/graphql';

@ObjectType()
export class TitleAndId {
  @Field(() => Number, { nullable: true })
  id?: number;
  @Field(() => String, { nullable: true })
  title?: string;
}

@InputType()
export class FindMyExamHistoryInput {
  @Field(() => [Number])
  categoryIds: number[];
}

@ObjectType()
export class FindMyExamHistoryOutput extends CoreOutput {
  @Field(() => [TitleAndId], { nullable: true })
  titleAndId?: TitleAndId[];
}
