import { Module } from '@nestjs/common';
import { ExamCategoryBookmarkResolver } from './exam-category-bookmark.resolver';
import { ExamCategoryBookmarkService } from './exam-category-bookmark.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamCategoryBookmark } from './entities/exam-category-bookmark';

@Module({
  imports: [TypeOrmModule.forFeature([ExamCategoryBookmark])],
  providers: [ExamCategoryBookmarkResolver, ExamCategoryBookmarkService],
})
export class ExamCategoryBookmarkModule {}
