import { MockExam } from '../entities/mock-exam.entity';
import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ExamType } from 'src/exam-category/entities/mock-exam-category.entity';

@InputType()
export class ReadAllMockExamsInput {
  @Field(() => String, { defaultValue: '' })
  query?: string;
  @Field(() => String, { defaultValue: '' })
  category?: string;
  @Field(() => Boolean, { defaultValue: false })
  all?: boolean;
  @Field(() => Boolean, { defaultValue: false })
  approved?: boolean;
  @Field(() => ExamType, { defaultValue: ExamType.SUBJECTIVE })
  examType?: ExamType;
}

@ObjectType()
export class ReadAllMockExamsOutput extends CoreOutput {
  @Field(() => [MockExam])
  mockExams?: MockExam[];
}
