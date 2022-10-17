import { MockExamQuestion } from './../entities/mock-exam-question.entity';
import { CoreOutput } from './../../common/dtos/output.dto';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ReadAllMockExamQuestionOutput extends CoreOutput {
  @Field(() => [MockExamQuestion])
  mockExamQuestions?: MockExamQuestion[];
}
