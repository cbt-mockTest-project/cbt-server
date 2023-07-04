import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from './entities/partners.entity';
import { PartnersResolver } from './partners.resolver';
import { PartnersService } from './partners.service';

@Module({
  imports: [TypeOrmModule.forFeature([Partner])],
  providers: [PartnersResolver, PartnersService],
})
export class PartnersModule {}
