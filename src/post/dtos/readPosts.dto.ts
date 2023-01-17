import { CoreOutput } from './../../common/dtos/output.dto';
import { Post } from './../entities/post.entity';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class ReadPostsInput {
  @Field(() => Number)
  page: number;
  @Field(() => Number)
  limit: number;
}

@ObjectType()
export class ReadPostsOutput extends CoreOutput {
  @Field(() => [Post], { nullable: true })
  posts?: Post[];
  @Field(() => Number, { defaultValue: 0 })
  count?: number;
}
