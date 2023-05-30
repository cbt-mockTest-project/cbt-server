import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ZepComment } from 'src/zep/entities/zepComment.entity';

export class CreateZepCommentInput {
  @IsString()
  userId: string;

  @IsNumber()
  postId: number;

  @IsString()
  content: string;
}

export class CreateZepCommentOutput extends CoreOutput {
  @IsOptional()
  comment?: ZepComment = null;
}
