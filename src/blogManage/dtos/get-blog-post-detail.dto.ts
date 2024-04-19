import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ObjectType()
export class UniqueMorpheme {
  @Field(() => String)
  word: string;
  @Field(() => Number)
  count: number;
}

@InputType()
export class GetBlogPostDetailInput {
  @Field(() => String)
  postId: string;
  @Field(() => String)
  blogId: string;
}

@ObjectType()
export class GetBlogPostDetailOutput extends CoreOutput {
  @Field(() => Number)
  textLength: number;
  @Field(() => Number)
  imageCount: number;
  @Field(() => Number)
  likeCount: number;
  @Field(() => Number)
  commentCount: number;
  @Field(() => String)
  title: string;
  @Field(() => String)
  text: string;
  @Field(() => String)
  postAddDate: string;
  @Field(() => [String])
  tagList: string[];
  @Field(() => [String])
  linkList: string[];
  @Field(() => [UniqueMorpheme])
  uniqueMorphemeList: UniqueMorpheme[];
}
