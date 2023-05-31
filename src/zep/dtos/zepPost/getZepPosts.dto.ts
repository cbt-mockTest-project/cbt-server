import { IsOptional, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ZepPost, ZepPostCategory } from 'src/zep/entities/zepPost.entity';

export class GetZepPostsInput {
  @IsOptional()
  category?: ZepPostCategory;

  @IsString()
  page: string;

  @IsString()
  limit: string;
}

export class GetZepPostsOutput extends CoreOutput {
  @IsOptional()
  posts?: ZepPost[] = [];
  @IsOptional()
  total?: number;
}
