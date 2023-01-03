import { MockExamQuestionComment } from '../entities/mock-exam-question-Comment.entity';
import { CoreOutput } from '../../common/dtos/output.dto';
import { InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class DeleteMockExamQuestionCommentInput extends PickType(
  MockExamQuestionComment,
  ['id'],
) {}

@ObjectType()
export class DeleteMockExamQuestionCommentOutput extends CoreOutput {}
