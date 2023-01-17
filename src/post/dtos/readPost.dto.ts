import { CoreOutput } from './../../common/dtos/output.dto';
import { Post } from './../entities/post.entity';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class ReadPostInput extends PickType(Post, ['id']) {}

@ObjectType()
export class ReadPostOutput extends CoreOutput {
  @Field(() => Post, { nullable: true })
  post?: Post;
}
