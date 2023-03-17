import { CoreOutput } from 'src/common/dtos/output.dto';
import { MockExamCategory } from '../entities/mock-exam-category.entity';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

@ObjectType()
class ExamTitleAndId {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  title: string;
}
@InputType()
export class ReadMockExamTitlesByCateoryInput extends PickType(
  MockExamCategory,
  ['name'],
) {
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  all?: boolean;
}

@ObjectType()
export class ReadMockExamTitlesByCateoryOutput extends CoreOutput {
  @Field(() => [ExamTitleAndId])
  titles?: ExamTitleAndId[];
}
