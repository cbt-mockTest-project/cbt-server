import { MockExamQuestionFeedback } from './../entities/mock-exam-question-feedback.entity';
import { CoreOutput } from './../../common/dtos/output.dto';
import { InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class EditMockExamQuestionFeedbackInput extends PickType(
  MockExamQuestionFeedback,
  ['id', 'content'],
) {}

@ObjectType()
export class EditMockExamQuestionFeedbackOutput extends CoreOutput {}
