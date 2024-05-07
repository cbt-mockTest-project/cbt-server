import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ItemSalesHistory } from './entities/item-sales-history.entity';
import { ItemSalesHistoryService } from './item-sales-history.service';
import {
  CreateItemSalesHistoryInput,
  CreateItemSalesHistoryOutput,
} from './dtos/item-sales-history/createItemSalesHistory.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/auth/role.decorators';
import { GetItemSalesHistoriesForItemOwnerOutput } from './dtos/item-sales-history/getItemSalesHistoriesForItemOwner';

@Resolver(() => ItemSalesHistory)
export class ItemSalesHistoryResolver {
  constructor(
    private readonly itemSalesHistoryService: ItemSalesHistoryService,
  ) {}

  @Role(['ANY'])
  @Mutation(() => CreateItemSalesHistoryOutput)
  createItemSalesHistory(
    @AuthUser() user: User,
    @Args('input')
    createItemSalesHistory: CreateItemSalesHistoryInput,
  ): Promise<CreateItemSalesHistoryOutput> {
    return this.itemSalesHistoryService.createItemSalesHistory(
      createItemSalesHistory,
      user,
    );
  }

  @Role(['ANY'])
  @Query(() => [GetItemSalesHistoriesForItemOwnerOutput])
  getItemSalesHistoriesForItemOwner(
    @AuthUser() user: User,
  ): Promise<GetItemSalesHistoriesForItemOwnerOutput> {
    return this.itemSalesHistoryService.getItemSalesHistoriesForItemOwner(user);
  }
}
