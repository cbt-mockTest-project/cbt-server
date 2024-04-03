import { Module } from '@nestjs/common';
import { CoupangService } from './coupang.service';
import { CoupangResolver } from './coupang.resolver';

@Module({
  providers: [CoupangService, CoupangResolver],
})
export class CoupangModule {}
