import { IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

export class GetNaverBlogVisitorCountInput {
  @IsString()
  blogId: string;
}

export class GetNaverBlogVisitorCountOutput extends CoreOutput {}
