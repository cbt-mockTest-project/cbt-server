import { QuestionState } from './../entities/mock-exam-question-state.entity';
import { MockExamQuestion } from './../entities/mock-exam-question.entity';
import { CoreOutput } from './../../common/dtos/output.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class ReadMockExamQuestionInput {
  @Field(() => Number)
  questionId: number;
  @Field(() => Number, { nullable: true })
  examId?: number;
}

@ObjectType()
export class ReadMockExamQuestionOutput extends CoreOutput {
  @Field(() => MockExamQuestion)
  mockExamQusetion?: MockExamQuestion;
  @Field(() => QuestionState, { nullable: true })
  state?: QuestionState;
  @Field(() => Boolean, { defaultValue: false })
  isCoAuthor?: boolean;
}
