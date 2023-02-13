import { MockExamCategory } from './../entities/mock-exam-category.entity';
import {
  ObjectType,
  Field,
  InputType,
  PickType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class ReadAllMockExamCategoriesInput extends PartialType(
  PickType(MockExamCategory, ['type']),
) {
  @Field(() => Boolean, { defaultValue: false })
  all?: boolean;
}

@ObjectType()
export class ReadAllMockExamCategoriesOutput extends CoreOutput {
  @Field(() => [MockExamCategory])
  categories?: MockExamCategory[];
}
