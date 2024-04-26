import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {
  constructor(@InjectRepository(Item) private readonly: Repository<Item>) {}

  //   async createItem() {}

  //   async updateItem() {}

  //   async deleteItem() {}

  //   async getItems() {}

  //   async getItem() {}

  //   async approveItem() {}

  //   async rejectItem() {}
}
