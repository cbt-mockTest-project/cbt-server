import { Query, Resolver } from '@nestjs/graphql';
import { Item } from './entities/item.entity';
import { ItemService } from './item.service';

@Resolver(() => Item)
export class ItemResolver {
  constructor(private readonly Service: ItemService) {}

  //   async createItem() {}

  //   async updateItem() {}

  //   async deleteItem() {}

  //   async getItems() {}

  //   async getItem() {}

  //   async approveItem() {}

  //   async rejectItem() {}
}
