import { CoreOutput } from './../../common/dtos/output.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class EditPostLikeInput {
  @Field(() => Number)
  postId: number;
}

@ObjectType()
export class EditPostLikeOutput extends CoreOutput {
  @Field(() => Boolean, { defaultValue: false })
  currentState?: boolean;
}
