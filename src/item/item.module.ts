import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Item } from './entities/item.entity';
import { ItemService } from './item.service';
import { ItemResolver } from './item.resolver';
import { ItemSalesHistory } from './entities/item-sales-history.entity';
import { ItemRevision } from './entities/item-revision.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, ItemSalesHistory, ItemRevision])],
  providers: [ItemService, ItemResolver],
})
export class ItemModule {}
