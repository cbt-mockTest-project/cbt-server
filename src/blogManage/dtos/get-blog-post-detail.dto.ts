import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class GetBlogPostDetailInput {
  @Field(() => String)
  postId: string;
  @Field(() => String)
  blogId: string;
}

@ObjectType()
export class GetBlogPostDetailOutput extends CoreOutput {
  @Field(() => Number)
  textLength: number;
}
