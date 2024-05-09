import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RevenueRequestForm } from './entites/revenue-request-form.entity';
import { RevenueRequestFormService } from './revenue-request-form.service';
import { RevenueRequestFormResolver } from './revenue-request-form.resolver';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RevenueRequestForm, MockExamCategory])],
  providers: [RevenueRequestFormService, RevenueRequestFormResolver],
})
export class RevenueRequestFormModule {}
