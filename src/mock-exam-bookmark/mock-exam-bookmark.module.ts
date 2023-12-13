import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MockExamBookmark } from './entities/mock-exam-bookmark.entity';
import { MockExamBookmarkResolver } from './mock-exam-bookmark.resolver';
import { MockExamBookmarkService } from './mock-exam-bookmark.service';

@Module({
  imports: [TypeOrmModule.forFeature([MockExamBookmark])],
  providers: [MockExamBookmarkResolver, MockExamBookmarkService],
})
export class MockExamBookmarkModule {}
