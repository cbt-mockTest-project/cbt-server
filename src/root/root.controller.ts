import { Controller, Get } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

@Controller('')
export class RootController {
  constructor(private readonly configService: ConfigService) {}
  @Get('')
  async getRoot() {
    return 'moducbt is good!';
  }
}
