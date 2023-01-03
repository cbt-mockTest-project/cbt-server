import { CoreOutput } from '../../common/dtos/output.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class ReadMockExamQuestionCommentLikesByQuestinIdInput {
  @Field(() => Number)
  commentId: number;
}

@ObjectType()
export class ReadMockExamQuestionCommentLikesByQuestinIdOutput extends CoreOutput {
  @Field(() => Number, { defaultValue: 0 })
  count?: number;
}
