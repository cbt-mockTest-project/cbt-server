import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class DeleteTextHighlightInput {
  @Field(() => String)
  textHighlightId: string;
}

@ObjectType()
export class DeleteTextHighlightOutput extends CoreOutput {}
