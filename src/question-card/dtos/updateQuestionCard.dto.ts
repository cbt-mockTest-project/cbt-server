import { QuestionCard } from './../entities/question-card.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class UpdateQuestionCardInput {
  @Field(() => String, { nullable: true })
  question?: string;
  @Field(() => String, { nullable: true })
  solution?: string;
  @Field(() => Number)
  questionId: number;
}

@ObjectType()
export class UpdateQuestionCardOutput extends CoreOutput {
  @Field(() => QuestionCard, { nullable: true })
  questionCard?: QuestionCard;
}
