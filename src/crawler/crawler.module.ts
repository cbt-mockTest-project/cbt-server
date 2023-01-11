import { Module } from '@nestjs/common';
import { CrawlerResolver } from './crawler.resolver';
import { CrawlerService } from './crawler.service';

@Module({
  providers: [CrawlerResolver, CrawlerService],
  exports: [CrawlerService, CrawlerResolver],
})
export class CrawlerModule {}
