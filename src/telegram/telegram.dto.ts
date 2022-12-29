import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

InputType();
export class SendMessageToAlramChannelOfTelegramInput {
  @Field(() => String)
  message: string;
}

@ObjectType()
export class SendMessageToAlramChannelOfTelegramOutput extends CoreOutput {}
