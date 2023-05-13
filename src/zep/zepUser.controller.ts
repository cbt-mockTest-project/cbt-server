import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ZepUserService } from './zepUser.service';
import {
  UpdateZepUserInput,
  UpdateZepUserOutput,
} from './dtos/zepUser/updateZepUser.dto';
import { GetZepUserOutput } from './dtos/zepUser/getZepUser.dto';

@Controller('zep/user')
export class ZepUserController {
  constructor(private readonly zepUserService: ZepUserService) {}

  @Post('/')
  async updateZepUser(
    @Body() updateZepUserInput: UpdateZepUserInput,
  ): Promise<UpdateZepUserOutput> {
    return this.zepUserService.updateZepUser(updateZepUserInput);
  }

  @Get('/:id')
  async getZepUser(@Param('id') id: string): Promise<GetZepUserOutput> {
    return this.zepUserService.getZepUser(id);
  }
}
