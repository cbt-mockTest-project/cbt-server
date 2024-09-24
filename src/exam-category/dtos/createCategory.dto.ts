import { CoreOutput } from '../../common/dtos/output.dto';
import {
  ExamType,
  MockExamCategory,
} from './../entities/mock-exam-category.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateMockExamCategoryInput {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true, defaultValue: '' })
  description?: string;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  isPublic?: boolean;

  @Field(() => ExamType, { nullable: true })
  examType?: ExamType;
}

@ObjectType()
export class CreateMockExamCategoryOutput extends CoreOutput {
  @Field(() => MockExamCategory, { nullable: true })
  category?: MockExamCategory;
}
