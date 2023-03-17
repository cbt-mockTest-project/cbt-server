import { MockExamCategory } from './../entities/mock-exam-category.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ReadMyMockExamCategoriesOutput extends CoreOutput {
  @Field(() => [MockExamCategory])
  categories?: MockExamCategory[];
}
