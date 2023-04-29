import { Module } from '@nestjs/common';
import { ZepController } from './zep.controller';
import { ZepService } from './zep.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MockExamQuestion } from 'src/mock-exams/entities/mock-exam-question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MockExamQuestion])],
  controllers: [ZepController],
  providers: [ZepController, ZepService],
})
export class ZepModule {}
