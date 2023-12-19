import { MockExamQuestionState } from 'src/exam/entities/mock-exam-question-state.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class ReadMyExamQuestionStateInput {
  @Field(() => Number)
  questionId: number;
}

@ObjectType()
export class ReadMyExamQuestionStateOutput extends CoreOutput {
  @Field(() => MockExamQuestionState)
  state?: MockExamQuestionState;
}
