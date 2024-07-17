import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class DeleteTextHighlightsInput {
  @Field(() => Number)
  questionId: number;
}

@ObjectType()
export class DeleteTextHighlightsOutput extends CoreOutput {}
