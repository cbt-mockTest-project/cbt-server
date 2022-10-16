import { MockExamCategory } from './../entities/mock-exam-category.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ObjectType()
export class ReadAllMockExamCategoriesOutput extends CoreOutput {
  @Field(() => [MockExamCategory])
  categories?: MockExamCategory[];
}
