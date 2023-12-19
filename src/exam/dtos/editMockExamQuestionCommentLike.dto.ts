import { CoreOutput } from '../../common/dtos/output.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class EditMockExamQuestionCommentLikeInput {
  @Field(() => Number)
  commentId: number;
}

@ObjectType()
export class EditMockExamQuestionCommentLikeOutput extends CoreOutput {
  @Field(() => Boolean, { defaultValue: false })
  currentState?: boolean;
}
