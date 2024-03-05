import { IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

export class GetMacroHistoryInput {
  @IsString()
  blogId: string;
  @IsString()
  page: string;
}

export class GetMacroHistoryOutput extends CoreOutput {}
