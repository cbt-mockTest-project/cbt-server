import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { MockExamCategory } from '../entities/mock-exam-category.entity';

@InputType()
export class ReadMockExamCategoryByExamIdInput {
  @Field(() => Number)
  examId: number;
}

@ObjectType()
export class ReadMockExamCategoryByExamIdOutput extends CoreOutput {
  @Field(() => MockExamCategory, { nullable: true })
  category?: MockExamCategory;
}
