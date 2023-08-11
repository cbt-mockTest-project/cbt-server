import { CoreOutput } from './../../common/dtos/output.dto';
import { Post, PostCategory } from './../entities/post.entity';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class PostDataInput {
  @Field(() => Number, { defaultValue: 0 })
  price: number;
  @Field(() => String, { defaultValue: '' })
  fileName: string;
  @Field(() => String, { defaultValue: '' })
  fileUrl: string;
  @Field(() => Number, { defaultValue: 0 })
  filePage: number;
}

@InputType()
export class CreatePostInput extends PickType(Post, ['content', 'title']) {
  @Field(() => PostCategory, { nullable: true })
  category?: PostCategory;
  @Field(() => PostDataInput, { nullable: true })
  data?: PostDataInput;
}

@ObjectType()
export class CreatePostOutput extends CoreOutput {
  @Field(() => Number, { nullable: true })
  postId?: number;
}
