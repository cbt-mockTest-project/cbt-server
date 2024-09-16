import { Module } from '@nestjs/common';
import { CoupangService } from './coupang.service';
import { CoupangController } from './coupang.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

@Module({
  providers: [CoupangService],
  controllers: [CoupangController],
  imports: [TypeOrmModule.forFeature([Product])],
})
export class CoupangModule {}
