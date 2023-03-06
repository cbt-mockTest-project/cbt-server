import { MockExamQuestion } from './../entities/mock-exam-question.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ReadAllQuestionsOutput extends CoreOutput {
  @Field(() => [MockExamQuestion], { nullable: true })
  questions?: MockExamQuestion[];
}
