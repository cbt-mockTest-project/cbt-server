import { IsNumber, IsOptional } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ZepComment } from 'src/zep/entities/zepComment.entity';

export class GetZepCommentsInput {
  @IsNumber()
  postId: number;
}

export class GetZepCommentsOutput extends CoreOutput {
  @IsOptional()
  comments?: ZepComment[] = [];
}
