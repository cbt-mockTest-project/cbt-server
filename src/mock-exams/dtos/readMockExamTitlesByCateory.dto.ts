import { CoreOutput } from 'src/common/dtos/output.dto';
import { MockExamCategory } from '../entities/mock-exam-category.entity';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class ReadMockExamTitlesByCateoryInput extends PickType(
  MockExamCategory,
  ['name'],
) {}

@ObjectType()
export class ReadMockExamTitlesByCateoryOutput extends CoreOutput {
  @Field(() => [String])
  titles?: string[];
}
