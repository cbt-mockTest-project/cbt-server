import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { QuestionState } from '../entities/mock-exam-question-state.entity';
import { MockExamQuestion } from '../entities/mock-exam-question.entity';

@InputType()
export class ReadQuestionsByExamIdsInput {
  @Field(() => String, { defaultValue: 'normal' })
  order?: 'random' | 'normal';
  @Field(() => [QuestionState], { nullable: true })
  states?: QuestionState[];
  @Field(() => [Number], { nullable: true })
  ids?: number[];
  @Field(() => Number, { nullable: true })
  limit?: number;
}

@ObjectType()
export class ReadQuestionsByExamIdsOutput extends CoreOutput {
  @Field(() => [MockExamQuestion], { defaultValue: [] })
  questions?: MockExamQuestion[];
}
