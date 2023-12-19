import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { MockExamCategory } from '../entities/mock-exam-category.entity';

@InputType()
export class ReadMockExamCategoryByCategoryIdInput {
  @Field(() => Number)
  id: number;
}

@ObjectType()
export class ReadMockExamCategoryByCategoryIdOutput extends CoreOutput {
  @Field(() => MockExamCategory, { nullable: true })
  category?: MockExamCategory;
}
