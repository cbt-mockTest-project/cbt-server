import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MockExamQuestion } from 'src/exam/entities/mock-exam-question.entity';
import { User } from 'src/users/entities/user.entity';
import { TextHighlight } from './entites/text-highlight.entity';
import { TextHighlightService } from './text-highlight.service';
import { TextHighlightResolver } from './text-highlight.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([TextHighlight, MockExamQuestion, User])],
  providers: [TextHighlightService, TextHighlightResolver],
  // exports: [HighlightService],
})
export class TextHighlightModule {}
