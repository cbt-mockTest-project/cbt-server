import { ObjectType, InputType, Field } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { HighlightItemType } from '../entities/mock-exam-question-highlight.entity';

@InputType()
export class InsertQuestionHighlightInput {
  @Field(() => [HighlightItemType])
  questionHighlights: HighlightItemType[];

  @Field(() => [HighlightItemType])
  solutionHighlights: HighlightItemType[];

  @Field(() => Number)
  @Field(() => String, { nullable: true })
  solutionHtml?: string;

  @Field(() => Number)
  questionId: number;
}

@ObjectType()
export class InsertQuestionHighlightOutput extends CoreOutput {}
