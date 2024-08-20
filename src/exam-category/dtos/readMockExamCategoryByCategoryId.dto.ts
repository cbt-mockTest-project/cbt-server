import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import {
  ExamType,
  MockExamCategory,
} from '../entities/mock-exam-category.entity';

@InputType()
export class ReadMockExamCategoryByCategoryIdInput {
  @Field(() => Number, { nullable: true })
  id?: number;
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => String, { nullable: true })
  urlSlug?: string;
  @Field(() => ExamType, { nullable: true, defaultValue: ExamType.SUBJECTIVE })
  examType?: ExamType;
}

@ObjectType()
export class ReadMockExamCategoryByCategoryIdOutput extends CoreOutput {
  @Field(() => MockExamCategory, { nullable: true })
  category?: MockExamCategory;
}
