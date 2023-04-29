import { Controller, Get } from '@nestjs/common';
import { ZepService } from './zep.service';

@Controller('zep')
export class ZepController {
  constructor(private readonly zepService: ZepService) {}
  @Get('/random-question')
  async getRandomQuestion() {
    return this.zepService.getRandomQuestion();
  }
}
