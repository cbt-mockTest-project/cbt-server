import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { MockExam } from '../entities/mock-exam.entity';

@InputType()
class ExamOrder {
  @Field(() => Number)
  examId: number;
  @Field(() => Number)
  order: number;
}

@InputType()
export class UpdateExamOrderInput {
  @Field(() => [ExamOrder])
  examOrders: ExamOrder[];
}

@ObjectType()
export class UpdateExamOrderOutput extends CoreOutput {
  @Field(() => [MockExam], { nullable: true })
  mockExams?: MockExam[];
}
