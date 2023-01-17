import { CoreOutput } from '../../common/dtos/output.dto';
import { Post } from '../entities/post.entity';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class EditPostInput extends PickType(Post, ['id']) {
  @Field(() => String, { nullable: true })
  content?: string;
  @Field(() => String, { nullable: true })
  title?: string;
}

@ObjectType()
export class EditPostOutput extends CoreOutput {
  @Field(() => String, { nullable: true })
  title?: string;
  @Field(() => String, { nullable: true })
  content?: string;
}
