import { CoreOutput } from '../../common/dtos/output.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class EditQuizCommentLikeInput {
  @Field(() => Number)
  commentId: number;
}

@ObjectType()
export class EditQuizCommentLikeOutput extends CoreOutput {
  @Field(() => Boolean, { defaultValue: false })
  currentState?: boolean;
}
