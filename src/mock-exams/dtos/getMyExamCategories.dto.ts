import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';

@InputType()
export class GetMyExamCategoriesInput {}

@ObjectType()
export class GetMyExamCategoriesOutput extends CoreOutput {
  @Field(() => [MockExamCategory], { nullable: true })
  categories?: MockExamCategory[];
}
