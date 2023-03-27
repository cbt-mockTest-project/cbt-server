import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { QuestionCard } from '../entities/question-card.entity';

@InputType()
export class ReadQuestionCardInput {
  @Field(() => Number)
  id: number;
}

@ObjectType()
export class ReadQuestionCardOutput extends CoreOutput {
  @Field(() => QuestionCard, { nullable: true })
  questionCard?: QuestionCard;
}
