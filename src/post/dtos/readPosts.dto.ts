import { CoreOutput } from './../../common/dtos/output.dto';
import { Post, PostCategory } from './../entities/post.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class ReadPostsInput {
  @Field(() => Number)
  page: number;
  @Field(() => Number, { nullable: true })
  limit: number;
  @Field(() => PostCategory, { nullable: true })
  category: PostCategory;
  @Field(() => Boolean, { defaultValue: false })
  all: boolean;
}

@ObjectType()
export class ReadPostsOutput extends CoreOutput {
  @Field(() => [Post], { nullable: true })
  posts?: Post[];
  @Field(() => Number, { defaultValue: 0 })
  count?: number;
}
