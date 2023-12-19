import { MockExam } from '../entities/mock-exam.entity';
import { CoreOutput } from '../../common/dtos/output.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class SearchMockExamInput {
  @Field(() => String)
  query: string;
}

@ObjectType()
export class SearchMockExamOutput extends CoreOutput {
  @Field(() => [MockExam])
  mockExams?: MockExam[];
  @Field(() => Number)
  totalResults?: number;
}
