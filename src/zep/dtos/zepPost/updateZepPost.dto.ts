import { IsOptional, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ZepPost, ZepPostCategory } from 'src/zep/entities/zepPost.entity';

export class UpdateZepPostInput {
  @IsString()
  @IsOptional()
  title?: string;
  @IsString()
  @IsOptional()
  content?: string;
  @IsOptional()
  category?: ZepPostCategory;
  @IsString()
  userId: string;
}

export class UpdateZepPostOutput extends CoreOutput {
  @IsOptional()
  post?: ZepPost = null;
}
