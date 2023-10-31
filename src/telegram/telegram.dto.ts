import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class sendMessageToTelegramInput {
  @Field(() => String)
  message: string;
  @Field(() => Number)
  channelId: number;
}

@ObjectType()
export class sendMessageToTelegramOutput extends CoreOutput {}
