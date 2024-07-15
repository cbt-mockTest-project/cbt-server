import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { MockExamQuestion } from '../entities/mock-exam-question.entity';

@InputType()
export class ReadBookmarkedQuestionsInput {
  @Field(() => Number, { nullable: true })
  folderId?: number;
  @Field(() => Number, { nullable: true })
  limit?: number;
  @Field(() => String, { defaultValue: 'normal' })
  order?: 'random' | 'normal';
}

@ObjectType()
export class ReadBookmarkedQuestionsOutput extends CoreOutput {
  @Field(() => [MockExamQuestion], { defaultValue: [] })
  questions?: MockExamQuestion[];
}
