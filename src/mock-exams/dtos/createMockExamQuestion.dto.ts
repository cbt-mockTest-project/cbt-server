import { CoreOutput } from './../../common/dtos/output.dto';
import { MockExamQuestion } from './../entities/mock-exam-question.entity';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class CreateMockExamQuestionInput extends PickType(MockExamQuestion, [
  'question',
  'question_img',
  'solution',
  'solution_img',
]) {
  @Field(() => String)
  mockExamTitle: string;
}

@ObjectType()
export class CreateMockExamQuestionOutput extends CoreOutput {}