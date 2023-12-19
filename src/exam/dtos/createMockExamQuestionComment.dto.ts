import { CoreOutput } from '../../common/dtos/output.dto';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { MockExamQuestionComment } from '../entities/mock-exam-question-comment.entity';

@InputType()
export class CreateMockExamQuestionCommentInput extends PickType(
  MockExamQuestionComment,
  ['content'],
) {
  @Field(() => Number)
  questionId: number;
}

@ObjectType()
export class CreateMockExamQuestionCommentOutput extends CoreOutput {
  @Field(() => MockExamQuestionComment)
  comment?: MockExamQuestionComment;
}
