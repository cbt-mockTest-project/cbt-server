import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class GetSearchRankInput {
  @Field(() => String)
  keyword: string;

  @Field(() => String)
  blogId: string;
}

@ObjectType()
export class GetSearchRankOutput extends CoreOutput {
  @Field(() => Number, { nullable: true, defaultValue: 0 })
  naverBlogSearchRank?: number;

  @Field(() => Number, { nullable: true, defaultValue: 0 })
  daumBlogSearchRank?: number;

  @Field(() => String, { nullable: true })
  postLink?: string;
}
