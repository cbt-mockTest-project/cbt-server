import { CoreOutput } from './../../common/dtos/output.dto';
import { Post, PostCategory } from './../entities/post.entity';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

export enum PostOrderType {
  createdAt = 'createdAt',
  like = 'like',
}

registerEnumType(PostOrderType, {
  name: 'OrderType',
  description: 'Order by criteria for posts',
});

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
  @Field(() => String, { nullable: true })
  search?: string;
  @Field(() => PostOrderType, { defaultValue: PostOrderType.createdAt })
  order: PostOrderType;
}

@ObjectType()
export class ReadPostsOutput extends CoreOutput {
  @Field(() => [Post], { nullable: true })
  posts?: Post[];
  @Field(() => Number, { defaultValue: 0 })
  count?: number;
}
