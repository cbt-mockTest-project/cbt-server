import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';

@InputType()
export class SearchMockExamCategoriesInput {
  @Field(() => String)
  keyword: string;
  @Field(() => Number)
  limit: number;
  @Field(() => Number)
  page: number;
  @Field(() => Boolean)
  isPublic: boolean;
}

@ObjectType()
export class SearchMockExamCategoriesOutput extends CoreOutput {
  @Field(() => [MockExamCategory], { defaultValue: [], nullable: true })
  categories?: MockExamCategory[];
  @Field(() => Number, { nullable: true })
  totalCount?: number;
}
