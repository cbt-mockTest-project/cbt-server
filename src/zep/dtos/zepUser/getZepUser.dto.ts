import { IsNotEmpty, IsNumber } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ZepUser } from 'src/zep/entities/zepUser.entity';

export class GetZepUserInput {
  @IsNumber()
  @IsNotEmpty()
  zepId: number;
}

export class GetZepUserOutput extends CoreOutput {
  zepUser?: ZepUser;
}
