import { MockExamQuestion } from '../entities/mock-exam-question.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class ReadAllQuestionsInput {
  @Field(() => Number, { nullable: true })
  page?: number;

  @Field(() => Number, { nullable: true })
  limit?: number;
}

@ObjectType()
export class ReadAllQuestionsOutput extends CoreOutput {
  @Field(() => [MockExamQuestion], { nullable: true })
  questions?: MockExamQuestion[];
}
