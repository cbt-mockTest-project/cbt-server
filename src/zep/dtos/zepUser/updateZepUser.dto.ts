import { IsNotEmpty, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ZepUser } from 'src/zep/entities/zepUser.entity';

export class UpdateZepUserInput {
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsString()
  @IsNotEmpty()
  zepId: string;
}

export class UpdateZepUserOutput extends CoreOutput {
  zepUser?: ZepUser;
}
