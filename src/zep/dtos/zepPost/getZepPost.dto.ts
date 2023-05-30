import { IsNumber, IsOptional } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ZepPost } from 'src/zep/entities/zepPost.entity';

export class GetZepPostInput {
  @IsNumber()
  postId: number;
}

export class GetZepPostOutput extends CoreOutput {
  @IsOptional()
  post?: ZepPost = null;
}
