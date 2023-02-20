import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Visit } from './entities/visit.entity';
import { VisitResolver } from './visit.resolver';
import { VisitService } from './visit.service';

@Module({
  providers: [VisitResolver, VisitService],
  imports: [TypeOrmModule.forFeature([Visit])],
})
export class VisitModule {}
