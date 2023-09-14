import { CoreOutput } from './../../common/dtos/output.dto';
import { MockExamQuestion } from './../entities/mock-exam-question.entity';
import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';

@InputType()
export class EditMockExamQuestionInput extends PickType(
  PartialType(MockExamQuestion),
  ['question', 'question_img', 'solution', 'solution_img', 'label'],
) {
  @Field(() => Number)
  id: number;
}

@ObjectType()
export class EditMockExamQuestionOutput extends CoreOutput {}
