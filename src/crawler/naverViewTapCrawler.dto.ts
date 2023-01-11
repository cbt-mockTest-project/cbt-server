import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ObjectType()
class SearchCount {
  @Field(() => Number)
  all: number;
  @Field(() => Number)
  blog: number;
}

@InputType()
export class NaverViewTapCrawlerInput {
  @Field(() => String)
  keyword: string;

  @Field(() => String)
  blogName: string;
}

@ObjectType()
export class NaverViewTapCrawlerOutput extends CoreOutput {
  @Field(() => String, { nullable: true })
  message?: string;
  @Field(() => SearchCount, { nullable: true })
  searchCount?: SearchCount;
}
