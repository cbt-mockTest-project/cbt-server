import { InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class ValidateChatbotKeyInput {
  @IsString()
  key: string;
}

@ObjectType()
export class ValidateChatbotKeyOutput extends CoreOutput {}
