import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ExamSource } from '../entities/mock-exam.entity';
import { MockExamCategory } from '../entities/mock-exam-category.entity';

@InputType()
export class ReadMockExamCategoriesInput {
  @Field(() => ExamSource, { defaultValue: ExamSource.MOUD_CBT })
  source?: ExamSource;
}

@ObjectType()
export class ReadMockExamCategoriesOutput extends CoreOutput {
  @Field(() => [MockExamCategory], { defaultValue: [] })
  categories?: MockExamCategory[];
}
