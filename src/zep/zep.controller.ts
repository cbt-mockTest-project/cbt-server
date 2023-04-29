import { Controller, Get, Param } from '@nestjs/common';
import { ZepService } from './zep.service';

@Controller('zep')
export class ZepController {
  constructor(private readonly zepService: ZepService) {}
  @Get('/random-question/:id')
  async getRandomQuestion(@Param('id') id: string) {
    return this.zepService.getRandomQuestion(id);
  }
}
