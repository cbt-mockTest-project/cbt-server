import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { QuestionCard } from '../entities/question-card.entity';

@InputType()
export class ReadMyQuestionCardsInput {
  @Field(() => Number, { nullable: true })
  categoryId?: number;
}

@ObjectType()
export class ReadMyQuestionCardsOutput extends CoreOutput {
  @Field(() => [QuestionCard], { nullable: true })
  questionCards?: QuestionCard[];
}
