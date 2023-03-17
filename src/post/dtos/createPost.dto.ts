import { CoreOutput } from './../../common/dtos/output.dto';
import { Post, PostCategory } from './../entities/post.entity';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class CreatePostInput extends PickType(Post, ['content', 'title']) {
  @Field(() => PostCategory, { nullable: true })
  category?: PostCategory;
}

@ObjectType()
export class CreatePostOutput extends CoreOutput {}
