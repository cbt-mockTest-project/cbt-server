import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class GetSearchAvailabilityInput {
  @Field(() => String)
  blogId: string;

  @Field(() => Number)
  itemCount: number;

  @Field(() => Number)
  page: number;
}

@ObjectType()
export class GetSearchAvailabilityOutput extends CoreOutput {
  @Field(() => [NaverPostInfo], { defaultValue: [], nullable: true })
  posts?: NaverPostInfo[];
}

@ObjectType()
export class NaverPostInfo {
  @Field(() => String)
  link: string;
  @Field(() => Number)
  commentCnt: number;
  @Field(() => Number)
  sympathyCnt: number;
  @Field(() => Number)
  logNo: number;
  @Field(() => String)
  titleWithInspectMessage: string;
  @Field(() => Boolean)
  isSearchAvailability: boolean;
}
