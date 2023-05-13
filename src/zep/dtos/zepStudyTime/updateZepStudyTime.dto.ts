import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ZepStudyTime } from 'src/zep/entities/zepStudyTime.entity';

export class UpdateZepStudyTimeInput {
  @IsOptional()
  @IsNumber()
  grassCount: number;

  @IsOptional()
  @IsNumber()
  studyTime: number;

  @IsString()
  @IsNotEmpty()
  zepId: string;
}

export class UpdateZepStudyTimeOutput extends CoreOutput {
  zepStudyTime?: ZepStudyTime;
}
