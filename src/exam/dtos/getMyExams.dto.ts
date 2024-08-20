import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { MockExam } from '../entities/mock-exam.entity';
import { ExamType } from 'src/exam-category/entities/mock-exam-category.entity';

@InputType()
export class GetMyExamsInput {
  @Field(() => Boolean, { nullable: true, defaultValue: false })
  isBookmarked?: boolean;

  @Field(() => ExamType, { nullable: true })
  examType?: ExamType;
}

@ObjectType()
export class GetMyExamsOutput extends CoreOutput {
  @Field(() => [MockExam], { nullable: true })
  exams?: MockExam[];
}
