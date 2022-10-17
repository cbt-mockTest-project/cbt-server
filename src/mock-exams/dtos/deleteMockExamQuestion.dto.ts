import { CoreOutput } from './../../common/dtos/output.dto';
import { MockExamQuestion } from './../entities/mock-exam-question.entity';
import { InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class DeleteMockExamQuestionInput extends PickType(MockExamQuestion, [
  'id',
]) {}

@ObjectType()
export class DeleteMockExamQuestionOutput extends CoreOutput {}
