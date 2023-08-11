import { UserRole } from './../../users/entities/user.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { MockExamCategory } from '../entities/mock-exam-category.entity';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { ExamStatus } from '../entities/mock-exam.entity';

@ObjectType()
export class ExamTitleAndId {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  title: string;
  @Field(() => String, { nullable: true })
  slug?: string;
  @Field(() => ExamStatus)
  status: ExamStatus;
  @Field(() => UserRole)
  role: UserRole;
  @Field(() => Number)
  order: number;
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
