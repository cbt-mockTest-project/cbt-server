import { MockExamQuestion } from '../entities/mock-exam-question.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class ReadMockExamQuestionBookmarkInput {
  @Field(() => Number)
  examId: number;
}

@ObjectType()
export class ReadMockExamQuestionBookmarkOutput extends CoreOutput {
  @Field(() => [MockExamQuestion])
  questions?: MockExamQuestion[];
}
