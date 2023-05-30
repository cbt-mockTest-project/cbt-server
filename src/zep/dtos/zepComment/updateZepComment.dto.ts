import { IsOptional, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ZepComment } from 'src/zep/entities/zepComment.entity';

export class UpdateZepCommentInput {
  @IsString()
  @IsOptional()
  content?: string;
  @IsString()
  userId: string;
}

export class UpdateZepCommentOutput extends CoreOutput {
  @IsOptional()
  comment?: ZepComment = null;
}
