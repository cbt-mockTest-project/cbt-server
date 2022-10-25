import { MockExam } from './../entities/mock-exam.entity';
import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class ReadAllMockExamsInput {
  @Field(() => String, { defaultValue: '' })
  query?: string;
  @Field(() => String, { defaultValue: '' })
  category?: string;
}

@ObjectType()
export class ReadAllMockExamsOutput extends CoreOutput {
  @Field(() => [MockExam])
  mockExams?: MockExam[];
}
