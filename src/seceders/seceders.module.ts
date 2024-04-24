import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seceders } from './entities/seceders.entity';
import { SecedersService } from './seceders.service';
import { SecedersResolver } from './seceders.resolver';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Seceders])],
  exports: [SecedersService],
  providers: [SecedersService, SecedersResolver],
})
export class SecedersModule {}
