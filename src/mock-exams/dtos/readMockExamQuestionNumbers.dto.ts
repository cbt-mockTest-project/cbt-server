import { ExamStatus } from 'src/enums/enum';
import { CoreOutput } from './../../common/dtos/output.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class QuestionNumber {
  @Field(() => Number)
  questionNumber: number;

  @Field(() => Number)
  questionId: number;
}
@InputType()
export class ReadMockExamQuestionNumbersInput {
  @Field(() => Number)
  mockExamId: number;
}

@ObjectType()
export class ReadMockExamQuestionNumbersOutput extends CoreOutput {
  @Field(() => [QuestionNumber])
  questionNumbers?: QuestionNumber[];

  @Field(() => ExamStatus, { nullable: true })
  examStatus?: ExamStatus;
}
