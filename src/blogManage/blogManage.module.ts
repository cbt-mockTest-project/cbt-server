import { Global, Module } from '@nestjs/common';
import { BlogManageResolver } from './blogManage.resolver';
import { BlogManageService } from './blogManage.service';

@Global()
@Module({
  providers: [BlogManageResolver, BlogManageService],
  exports: [BlogManageService, BlogManageResolver],
})
export class BlogManageModule {}
