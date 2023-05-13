import { IsNotEmpty, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ZepUser } from 'src/zep/entities/zepUser.entity';

export class GetZepUserInput {
  @IsString()
  @IsNotEmpty()
  zepId: string;
}

export class GetZepUserOutput extends CoreOutput {
  zepUser?: ZepUser;
}
