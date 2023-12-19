import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ExamViewer } from './entities/exam-viewer.entity';
import { MockExam } from 'src/exam/entities/mock-exam.entity';
import { User } from 'src/users/entities/user.entity';
import { ExamViewerService } from './exam-viewer.service';
import { ExamViewerResolver } from './exam-viewer.resolver';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExamViewer, MockExam, MockExamCategory, User]),
  ],
  providers: [ExamViewerService, ExamViewerResolver],
})
export class ExamViewerModule {}
