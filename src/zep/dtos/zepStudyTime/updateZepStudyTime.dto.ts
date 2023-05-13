import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { ZepStudyTime } from 'src/zep/entities/zepStudyTime.entity';

export class UpdateZepStudyTimeInput {
  @IsOptional()
  @IsNumber()
  grassCount: number;

  @IsOptional()
  @IsNumber()
  studyTime: number;

  @IsNumber()
  @IsNotEmpty()
  zepId: number;
}

export class UpdateZepStudyTimeOutput extends CoreOutput {
  zepStudyTime?: ZepStudyTime;
}
