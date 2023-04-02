import { ExamCoAuthor } from './entities/exam-co-author.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([ExamCoAuthor])],
})
export class ExamCoAuthorModule {}
