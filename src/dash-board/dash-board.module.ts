import { Module } from '@nestjs/common';
import { DashBoardService } from './dash-board.service';
import { DashBoardController } from './dash-board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NaverBlog } from 'src/blogManage/entities/naver-blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NaverBlog])],
  providers: [DashBoardService],
  controllers: [DashBoardController],
})
export class DashBoardModule {}
