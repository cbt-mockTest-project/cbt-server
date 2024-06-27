import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { MockExamQuestion } from '../entities/mock-exam-question.entity';

@InputType()
export class SearchQuestionsByKeywordInput {
  @Field(() => String)
  keyword: string;
  @Field(() => [Number], { defaultValue: [] })
  examIds: number[];
  @Field(() => Boolean, { defaultValue: false })
  isAll: boolean;
}

@ObjectType()
export class SearchQuestionsByKeywordOutput extends CoreOutput {
  @Field(() => [MockExamQuestion], { defaultValue: [], nullable: true })
  questions?: MockExamQuestion[];
}
