import { CoreOutput } from 'src/common/dtos/output.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class ViewPostInput {
  @Field(() => Number)
  postId: number;
}

@ObjectType()
export class ViewPostOutput extends CoreOutput {}
