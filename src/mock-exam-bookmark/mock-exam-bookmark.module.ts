import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MockExamBookmark } from './entities/mock-exam-bookmark.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MockExamBookmark])],
  providers: [],
})
export class MockExamBookmarkModule {}
