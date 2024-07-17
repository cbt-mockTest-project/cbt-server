import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MockExamQuestion } from 'src/exam/entities/mock-exam-question.entity';
import { User } from 'src/users/entities/user.entity';
import { TextHighlight } from './entites/text-highlight.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TextHighlight, MockExamQuestion, User])],
  //   providers: [HighlightService],
  //   exports: [HighlightService],
})
export class TextHighlightModule {}
