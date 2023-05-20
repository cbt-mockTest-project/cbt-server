import { Body, Controller, Get, Post } from '@nestjs/common';
import { ZepMapService } from './zepMap.service';
import { GetZepMapUserCountOutput } from './dtos/zepMap/getZepMapUserCount';
import {
  UpdateZepMapUserCountInput,
  UpdateZepMapUserCountOutput,
} from './dtos/zepMap/updateZepMapUserCount';

@Controller('zep/map')
export class ZepMapController {
  constructor(private readonly zepMapService: ZepMapService) {}

  @Get('/user-count')
  async getZepMapUserCount(): Promise<GetZepMapUserCountOutput> {
    return this.zepMapService.getZepMapUserCount();
  }

  @Post('/user-count')
  async updateZepMapUserCount(
    @Body() updateZepMapUserCountInpt: UpdateZepMapUserCountInput,
  ): Promise<UpdateZepMapUserCountOutput> {
    return this.zepMapService.updateZepMapUserCount(updateZepMapUserCountInpt);
  }
}
