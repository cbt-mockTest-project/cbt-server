import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ExamSource } from 'src/enums/enum';
import {
  ExamType,
  MockExamCategory,
} from 'src/exam-category/entities/mock-exam-category.entity';

@InputType()
export class GetExamCategoriesInput {
  @Field(() => ExamSource, { nullable: true })
  examSource?: ExamSource;

  @Field(() => Number, { nullable: true, defaultValue: 0 })
  categoryMakerId?: number;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  isBookmarked?: boolean;

  @Field(() => [Number], { nullable: true, defaultValue: null })
  categoryIds?: number[] | null;

  @Field(() => Number, { nullable: true, defaultValue: null })
  limit?: number;

  @Field(() => Number, { nullable: true, defaultValue: 0 })
  page?: number;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  isPublicOnly?: boolean;

  @Field(() => String, { nullable: true, defaultValue: '' })
  keyword?: string;

  @Field(() => Boolean, { nullable: true })
  isPick?: boolean;

  @Field(() => String, { nullable: true })
  sort?: string;

  @Field(() => ExamType, { nullable: true })
  examType?: ExamType;
}

@InputType()
export class GetExamCategoriesInputV2 {
  @Field(() => [ExamSource], { nullable: true, defaultValue: [] })
  examSources?: ExamSource[];

  @Field(() => Number, { nullable: true, defaultValue: 0 })
  categoryMakerId?: number;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  isBookmarked?: boolean;

  @Field(() => [Number], { nullable: true, defaultValue: null })
  categoryIds?: number[] | null;

  @Field(() => Number, { nullable: true, defaultValue: null })
  limit?: number;

  @Field(() => Number, { nullable: true, defaultValue: 0 })
  page?: number;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  isPublicOnly?: boolean;

  @Field(() => String, { nullable: true, defaultValue: '' })
  keyword?: string;

  @Field(() => Boolean, { nullable: true })
  isPick?: boolean;

  @Field(() => String, { nullable: true })
  sort?: string;

  @Field(() => ExamType, { nullable: true, defaultValue: ExamType.SUBJECTIVE })
  examType?: ExamType;
}

@ObjectType()
export class GetExamCategoriesOutput extends CoreOutput {
  @Field(() => [MockExamCategory], { nullable: true })
  categories?: MockExamCategory[];
}
