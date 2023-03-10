import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ObjectType()
class SearchCount {
  @Field(() => Number)
  all: number;
  @Field(() => Number)
  blog: number;
}

@ObjectType()
export class SearchCounts {
  @Field(() => SearchCount)
  naver: SearchCount;
  @Field(() => SearchCount)
  daum: SearchCount;
}

@ObjectType()
class PostInfo {
  @Field(() => String)
  title: string;
  @Field(() => String)
  link: string;
  @Field(() => String)
  content: string;
  @Field(() => String)
  thumb: string;
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
  @Field(() => SearchCounts, { nullable: true })
  searchCounts?: SearchCounts;
  @Field(() => PostInfo, { nullable: true })
  postInfo?: PostInfo;
}
