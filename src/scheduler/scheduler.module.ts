import { MockExamQuestion } from './../mock-exams/entities/mock-exam-question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulerService } from './scheduler.service';
import { Module } from '@nestjs/common';
import { VisitService } from 'src/visit/visit.service';
import { Visit } from 'src/visit/entities/visit.entity';
import { VisitHistory } from 'src/visit/entities/visitHistory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MockExamQuestion, Visit, VisitHistory])],
  providers: [SchedulerService, VisitService],
})
export class SchedulerModule {}
