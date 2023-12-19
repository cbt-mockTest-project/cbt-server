import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { MockExamCategory } from 'src/mock-exams/entities/mock-exam-category.entity';

@InputType()
export class GetMyBookmarkedExamCategoriesInput {}

@ObjectType()
export class GetMyBookmarkedExamCategoriesOutput extends CoreOutput {
  @Field(() => [MockExamCategory], { nullable: true })
  categories?: MockExamCategory[];
}
