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
  @Field(() => Boolean, { nullable: true, defaultValue: false })
  bookmarked?: boolean;
  @Field(() => Boolean, { nullable: true, defaultValue: false })
  highlighted?: boolean;
}

@ObjectType()
export class ReadQuestionsByExamIdsOutput extends CoreOutput {
  @Field(() => [MockExamQuestion], { defaultValue: [] })
  questions?: MockExamQuestion[];
}
