import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { MockExamQuestion } from '../../mock-exams/entities/mock-exam-question.entity';

@InputType()
export class GetRandomQuestionInput {}

@ObjectType()
export class GetRandomQuestionOutput extends CoreOutput {
  @Field(() => MockExamQuestion, { nullable: true })
  question?: MockExamQuestion;
}
