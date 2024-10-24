import { PostFile } from '../entities/postFile.entity';
import { CoreOutput } from './../../common/dtos/output.dto';
import { Post } from './../entities/post.entity';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class PostFileInput extends PickType(PostFile, [
  'name',
  'url',
  'format',
]) {}

@InputType()
export class CreatePostInput extends PickType(Post, [
  'content',
  'title',
  'keyword',
  'price',
  'imageUrls',
  'thumbnail',
]) {
  @Field(() => PostFileInput)
  file: PostFileInput;
}

@ObjectType()
export class CreatePostOutput extends CoreOutput {
  @Field(() => Post, { nullable: true })
  post?: Post;
}
