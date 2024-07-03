import { ObjectType, InputType, Field } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class InsertQuestionHighlightInput {
  @Field(() => String, { nullable: true })
  questionHtml?: string;

  @Field(() => String, { nullable: true })
  solutionHtml?: string;

  @Field(() => Number)
  questionId: number;
}

@ObjectType()
export class InsertQuestionHighlightOutput extends CoreOutput {}
