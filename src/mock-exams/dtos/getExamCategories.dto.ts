import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ExamSource } from '../entities/mock-exam.entity';
import { MockExamCategory } from '../entities/mock-exam-category.entity';

@InputType()
export class GetExamCategoriesInput {
  @Field(() => ExamSource, { nullable: true })
  examSource?: ExamSource;

  @Field(() => Number, { nullable: true, defaultValue: 0 })
  categoryMakerId?: number;
}

@ObjectType()
export class GetExamCategoriesOutput extends CoreOutput {
  @Field(() => [MockExamCategory], { nullable: true })
  categories?: MockExamCategory[];
}
