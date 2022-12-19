import { MockExamQuestion } from '../entities/mock-exam-question.entity';
import { CoreOutput } from '../../common/dtos/output.dto';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { MockExam } from '../entities/mock-exam.entity';

@InputType()
export class ReadMockExamQuestionsByMockExamIdInput extends PickType(MockExam, [
  'id',
]) {
  @Field(() => Boolean, { nullable: true })
  isRandom?: boolean;
}

@ObjectType()
export class ReadMockExamQuestionsByMockExamIdOutput extends CoreOutput {
  @Field(() => [MockExamQuestion])
  questions?: MockExamQuestion[];
  @Field(() => Number)
  count?: number;
}
