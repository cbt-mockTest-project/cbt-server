import { MockExamCategory } from './../entities/mock-exam-category.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ObjectType, Field, InputType } from '@nestjs/graphql';

@InputType()
export class ReadMyMockExamCategoriesInput {
  @Field(() => String, { defaultValue: 'author', nullable: true })
  type?: 'author' | 'viewer';
}

@ObjectType()
export class ReadMyMockExamCategoriesOutput extends CoreOutput {
  @Field(() => [MockExamCategory])
  categories?: MockExamCategory[];
}
