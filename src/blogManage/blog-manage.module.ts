import { Global, Module } from '@nestjs/common';
import { BlogManageResolver } from './blog-manage.resolver';
import { BlogManageService } from './blog-manage.service';
import { NaverBlog } from './entities/naver-blog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([NaverBlog])],
  providers: [BlogManageResolver, BlogManageService],
  exports: [BlogManageService, BlogManageResolver],
})
export class BlogManageModule {}
