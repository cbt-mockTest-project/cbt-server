import { QuestionCard } from './../entities/question-card.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class CreateQuestionCardInput {
  @Field(() => String)
  question: string;
  @Field(() => String)
  solution: string;
  @Field(() => Number)
  categoryId: number;
}

@ObjectType()
export class CreateQuestionCardOutput extends CoreOutput {
  @Field(() => QuestionCard, { nullable: true })
  questionCard?: QuestionCard;
}
