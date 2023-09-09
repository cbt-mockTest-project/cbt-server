import { MockExamCategory } from './../entities/mock-exam-category.entity';
import {
  ObjectType,
  Field,
  InputType,
  PickType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ExamSource } from '../entities/mock-exam.entity';

@InputType()
export class ReadAllMockExamCategoriesInput extends PartialType(
  PickType(MockExamCategory, ['type']),
) {
  @Field(() => Number, { nullable: true })
  partnerId?: number;

  @Field(() => ExamSource, {
    nullable: true,
    defaultValue: ExamSource.MOUD_CBT,
  })
  source?: ExamSource;
}

@ObjectType()
export class ReadAllMockExamCategoriesOutput extends CoreOutput {
  @Field(() => [MockExamCategory], { defaultValue: [] })
  categories?: MockExamCategory[];
}
