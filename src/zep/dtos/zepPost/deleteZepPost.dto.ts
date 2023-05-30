import { IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

export class DeleteZepPostInput {
  @IsString()
  userId: string;
}

export class DeleteZepPostOutput extends CoreOutput {}
