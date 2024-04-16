import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ObjectType()
export class BlogVisitor {
  @Field(() => String)
  date: string;
  @Field(() => String)
  visitor: string;
}

@ObjectType()
export class InfluencerInfo {
  @Field(() => String)
  nickName: string;

  @Field(() => String)
  keyword: string;

  @Field(() => Number)
  subscriberCount: number;

  @Field(() => String)
  introduction: string;

  @Field(() => String)
  category: string;

  @Field(() => String)
  url: string;
}

@ObjectType()
export class BlogInfo {
  @Field(() => InfluencerInfo, { nullable: true })
  influencerInfo: InfluencerInfo | null;

  @Field(() => [BlogVisitor], { nullable: true, defaultValue: [] })
  blogVisitor?: BlogVisitor[];

  @Field(() => Number)
  subscriberCount: number;

  @Field(() => String)
  blogName: string;

  @Field(() => String)
  blogDirectoryName: string;

  @Field(() => Number)
  totalVisitorCount: number;
}

@InputType()
export class GetBlogInfoInput {
  @Field(() => String)
  blogId: string;
}

@ObjectType()
export class GetBlogInfoOutput extends CoreOutput {
  @Field(() => BlogInfo, { nullable: true })
  blogInfo?: BlogInfo;
}
