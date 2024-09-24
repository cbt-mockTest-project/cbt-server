import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { MockExamQuestion } from '../entities/mock-exam-question.entity';
import { ExamType } from 'src/exam-category/entities/mock-exam-category.entity';

@InputType()
export class PartialMockExamQuestionInput extends PartialType(
  MockExamQuestion,
  InputType,
) {
  @Field(() => String)
  orderId: string;
}

@InputType()
export class SaveExamInput {
  @Field(() => Number, { nullable: true })
  categoryId?: number;

  @Field(() => String)
  uuid: string;

  @Field(() => String)
  title: string;

  @Field(() => [String])
  questionOrderIds: string[];

  @Field(() => [PartialMockExamQuestionInput], {
    nullable: true,
    defaultValue: [],
  })
  questions?: PartialMockExamQuestionInput[];

  @Field(() => ExamType, { nullable: true, defaultValue: ExamType.SUBJECTIVE })
  examType?: ExamType;
}

@ObjectType()
export class SaveExamOutput extends CoreOutput {
  @Field(() => Number, { nullable: true })
  examId?: number;
}
