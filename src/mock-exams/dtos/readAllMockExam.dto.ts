import { MockExam } from './../entities/mock-exam.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ObjectType()
export class ReadAllMockExamsOutput extends CoreOutput {
  @Field(() => [MockExam])
  mockExams?: MockExam[];
}
