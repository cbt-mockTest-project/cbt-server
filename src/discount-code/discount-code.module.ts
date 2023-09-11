import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountCode } from './discount-code.entity';
import { DiscountCodeService } from './discount-code.service';
import { DiscountCodeResolver } from './discount-code.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([DiscountCode])],
  providers: [DiscountCodeService, DiscountCodeResolver],
})
export class DiscountCodeModule {}
