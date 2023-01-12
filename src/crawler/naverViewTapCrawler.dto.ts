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
class PostInfo {
  @Field(() => String)
  title: string;
  @Field(() => String)
  link: string;
  @Field(() => String)
  content: string;
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
  @Field(() => PostInfo, { nullable: true })
  postInfo?: PostInfo;
}
