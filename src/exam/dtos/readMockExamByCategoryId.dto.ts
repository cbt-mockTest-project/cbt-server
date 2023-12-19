import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { MockExam } from '../entities/mock-exam.entity';

@InputType()
export class ReadMockExamByCategoryIdInput {
  @Field(() => Number)
  categoryId: number;
}

@ObjectType()
export class ReadMockExamByCategoryIdOutput extends CoreOutput {
  @Field(() => [MockExam], { nullable: true })
  mockExams?: MockExam[];
}
