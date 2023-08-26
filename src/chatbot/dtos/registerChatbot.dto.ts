import { InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class RegisterChatbotInput {
  @IsNumber()
  duration: number;
}

@ObjectType()
export class RegisterChatbotOutput extends CoreOutput {
  @IsString()
  @IsOptional()
  key?: string;
}
