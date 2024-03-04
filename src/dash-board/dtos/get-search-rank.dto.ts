import { IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

export class GetSearchRankInput {
  @IsString()
  keyword: string;

  @IsString()
  blogId: string;
}

export class GetSearchRankOutput extends CoreOutput {}
