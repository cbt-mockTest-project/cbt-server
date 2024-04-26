import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Item } from './entities/item.entity';
import { ItemService } from './item.service';
import { ItemResolver } from './item.resolver';
import { ItemSalesHistory } from './entities/item-sales-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, ItemSalesHistory])],
  providers: [ItemService, ItemResolver],
})
export class ItemModule {}
