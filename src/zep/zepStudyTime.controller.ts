import { Body, Controller, Post } from '@nestjs/common';
import {
  UpdateZepStudyTimeInput,
  UpdateZepStudyTimeOutput,
} from './dtos/zepStudyTime/updateZepStudyTime.dto';
import { ZepStudyTimeService } from './zepStudyTime.service';

@Controller('zep/user')
export class ZepStudyTimeController {
  constructor(private readonly zepStudyTimeService: ZepStudyTimeService) {}

  @Post('/study-time')
  async updateZepStudyTime(
    @Body() updateZepStudyTimeInput: UpdateZepStudyTimeInput,
  ): Promise<UpdateZepStudyTimeOutput> {
    return this.zepStudyTimeService.updateZepStudyTime(updateZepStudyTimeInput);
  }
}
