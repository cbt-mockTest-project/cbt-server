import { IsOptional, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ZepPost, ZepPostCategory } from 'src/zep/entities/zepPost.entity';

export class CreateZepPostInput {
  @IsString()
  userId: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  category?: ZepPostCategory = ZepPostCategory.FREE;
}

export class CreateZepPostOutput extends CoreOutput {
  @IsOptional()
  post?: ZepPost = null;
}
