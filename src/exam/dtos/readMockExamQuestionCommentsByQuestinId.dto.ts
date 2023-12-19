import { MockExamQuestionComment } from '../entities/mock-exam-question-comment.entity';
import { CoreOutput } from '../../common/dtos/output.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class ReadMockExamQuestionCommentsByQuestionIdInput {
  @Field(() => Number)
  questionId: number;
}

@ObjectType()
export class ReadMockExamQuestionCommentsByQuestionIdOutput extends CoreOutput {
  @Field(() => [MockExamQuestionComment], { nullable: true })
  comments?: MockExamQuestionComment[];
}
