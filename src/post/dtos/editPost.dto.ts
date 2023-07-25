import { CoreOutput } from '../../common/dtos/output.dto';
import { Post } from '../entities/post.entity';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { PostDataInput } from './createPost.dto';

@InputType()
export class EditPostInput extends PickType(Post, ['id']) {
  @Field(() => String, { nullable: true })
  content?: string;
  @Field(() => String, { nullable: true })
  title?: string;
  @Field(() => PostDataInput, { nullable: true })
  data?: PostDataInput;
}

@ObjectType()
export class EditPostOutput extends CoreOutput {
  @Field(() => String, { nullable: true })
  title?: string;
  @Field(() => String, { nullable: true })
  content?: string;
}
