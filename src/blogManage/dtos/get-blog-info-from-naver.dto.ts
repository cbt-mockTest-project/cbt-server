import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ObjectType()
export class NaverBlogInfo {
  @Field(() => String)
  blogName: string;
  @Field(() => String)
  blogDirectoryName: string;
  @Field(() => Number)
  subscriberCount: number;
  @Field(() => Number)
  totalVisitorCount: number;
}

@InputType()
export class GetBlogInfoFromNaverInput {
  @Field(() => String)
  blogId: string;
}

@ObjectType()
export class GetBlogInfoFromNaverOutput extends CoreOutput {}
