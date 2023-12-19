import { MockExamQuestionComment } from '../entities/mock-exam-question-comment.entity';
import { CoreOutput } from '../../common/dtos/output.dto';
import { InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class EditMockExamQuestionCommentInput extends PickType(
  MockExamQuestionComment,
  ['id', 'content'],
) {}

@ObjectType()
export class EditMockExamQuestionCommentOutput extends CoreOutput {}
