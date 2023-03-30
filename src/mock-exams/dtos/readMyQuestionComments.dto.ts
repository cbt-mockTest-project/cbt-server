import { MockExamQuestion } from 'src/mock-exams/entities/mock-exam-question.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class ReadMyQuestionCommentsInput {
  @Field(() => Number)
  examId: number;
}

@ObjectType()
export class ReadMyQuestionCommentsOutput extends CoreOutput {
  @Field(() => [MockExamQuestion], { nullable: true })
  questions?: MockExamQuestion[];
}
