import { MockExamQuestion } from '../entities/mock-exam-question.entity';
import { CoreOutput } from '../../common/dtos/output.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { QuestionState } from '../entities/mock-exam-question-state.entity';

@InputType()
export class ReadMockExamQuestionsByMockExamIdInput {
  @Field(() => Boolean, { nullable: true })
  isRandom?: boolean;
  @Field(() => Boolean, { nullable: true })
  bookmarked?: boolean;
  @Field(() => [QuestionState], { nullable: true })
  states?: QuestionState[];
  @Field(() => Number, { nullable: true })
  id?: number;
  @Field(() => [Number], { nullable: true })
  ids?: number[];
  @Field(() => Number, { nullable: true })
  limit?: number;
}

@ObjectType()
export class ReadMockExamQuestionsByMockExamIdOutput extends CoreOutput {
  @Field(() => [MockExamQuestion])
  questions?: MockExamQuestion[];
  @Field(() => Number)
  count?: number;
  @Field(() => String)
  title?: string;
  @Field(() => String, { defaultValue: '' })
  author?: string;
  @Field(() => Boolean, { defaultValue: false })
  isPremium?: boolean;
}
