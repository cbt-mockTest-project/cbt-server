import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { MockExam } from '../entities/mock-exam.entity';

@ObjectType()
export class ReadMyExamHistoryOutput extends CoreOutput {
  @Field(() => [MockExam], { nullable: true })
  mockExams?: MockExam[];
}
