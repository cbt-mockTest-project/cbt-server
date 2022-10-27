import { MockExamQuestion } from './../mock-exams/entities/mock-exam-question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulerService } from './scheduler.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([MockExamQuestion])],
  providers: [SchedulerService],
})
export class SchedulerModule {}
