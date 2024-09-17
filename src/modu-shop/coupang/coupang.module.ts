import { Global, Module } from '@nestjs/common';
import { CoupangService } from './coupang.service';
import { CoupangController } from './coupang.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CoupangSearchLog } from './entities/coupang-search-log';

@Global()
@Module({
  providers: [CoupangService],
  controllers: [CoupangController],
  imports: [TypeOrmModule.forFeature([Product, CoupangSearchLog])],
  exports: [CoupangService],
})
export class CoupangModule {}
