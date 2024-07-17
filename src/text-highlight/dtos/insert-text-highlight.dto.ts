import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import {
  TextHighlight,
  TextHighlightData,
} from '../entites/text-highlight.entity';

@InputType()
export class InsertTextHighlightInput {
  @Field(() => Number)
  questionId: number;

  @Field(() => String)
  textHighlightId: string;

  @Field(() => TextHighlightData)
  data: TextHighlightData;
}

@ObjectType()
export class InsertTextHighlightOutput extends CoreOutput {
  @Field(() => TextHighlight, { nullable: true })
  textHighlight?: TextHighlight;
}
