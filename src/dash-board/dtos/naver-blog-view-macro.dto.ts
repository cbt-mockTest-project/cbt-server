import { IsNumber, IsString } from 'class-validator';
import { isString } from 'lodash';
import { CoreOutput } from 'src/common/dtos/output.dto';

export class NaverBlogViewMacroInput {
  @IsString()
  blogId: string;

  @IsString()
  viewCount: string;
}

export class NaverBlogViewMacroOutput extends CoreOutput {}
