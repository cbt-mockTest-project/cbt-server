import { IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

export class DeleteZepCommentInput {
  @IsString()
  userId: string;
}

export class DeleteZepCommentOutput extends CoreOutput {}
