import { MockExamQuestionFeedback } from './../entities/mock-exam-question-feedback.entity';
import { CoreOutput } from './../../common/dtos/output.dto';
import { InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class DeleteMockExamQuestionFeedbackInput extends PickType(
  MockExamQuestionFeedback,
  ['id'],
) {}

@ObjectType()
export class DeleteMockExamQuestionFeedbackOutput extends CoreOutput {}
