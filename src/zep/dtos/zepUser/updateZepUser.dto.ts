import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ZepUser } from 'src/zep/entities/zepUser.entity';

export class UpdateZepUserInput {
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsNumber()
  @IsNotEmpty()
  zepId: number;
}

export class UpdateZepUserOutput extends CoreOutput {
  zepUser?: ZepUser;
}
