import { IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

export class GetSearchAvailabilityInput {
  @IsString()
  blogId: string;

  @IsString()
  itemCount: string;

  @IsString()
  page: string;
}

export class GetSearchAvailabilityOutput extends CoreOutput {}
