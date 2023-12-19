import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ExamSource } from 'src/enums/enum';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';

@InputType()
export class GetExamCategoriesInput {
  @Field(() => ExamSource, { nullable: true })
  examSource?: ExamSource;

  @Field(() => Number, { nullable: true, defaultValue: 0 })
  categoryMakerId?: number;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  isBookmarked?: boolean;

  @Field(() => Number, { nullable: true, defaultValue: null })
  limit?: number;
}

@ObjectType()
export class GetExamCategoriesOutput extends CoreOutput {
  @Field(() => [MockExamCategory], { nullable: true })
  categories?: MockExamCategory[];
}
