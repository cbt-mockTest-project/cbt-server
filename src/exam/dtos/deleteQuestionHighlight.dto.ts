import { ObjectType, InputType, Field } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class DeleteQuestionHighlightInput {
  @Field(() => Number)
  questionId: number;
}

@ObjectType()
export class DeleteQuestionHighlightOutput extends CoreOutput {}
