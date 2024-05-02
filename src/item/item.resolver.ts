import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Item } from './entities/item.entity';
import { ItemService } from './item.service';
import { CreateItemInput, CreateItemOutput } from './dtos/createItem.dto';
import { UpdateItemInput, UpdateItemOutput } from './dtos/updateItem.dto';
import { DeleteItemInput, DeleteItemOutput } from './dtos/deleteItem.dto';
import { ApproveItemInput, ApproveItemOutput } from './dtos/approveItem.dto';
import { RejectItemInput, RejectItemOutput } from './dtos/rejectItem.dto';
import { GetItemsForOwnerOutput } from './dtos/getItemsForOwner.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorators';
import { User } from 'src/users/entities/user.entity';
import { GetItemsInput, GetItemsOutput } from './dtos/getItems.dto';
import { GetItemInput } from './dtos/getItem.dto';
import {
  RequestDeleteItemInput,
  RequestDeleteItemOutput,
} from './dtos/requestDeleteItem.dto';
@Resolver(() => Item)
export class ItemResolver {
  constructor(private readonly itemService: ItemService) {}

  @Mutation(() => CreateItemOutput)
  @Role(['ANY'])
  async createItem(
    @Args('input') createItemInput: CreateItemInput,
    @AuthUser() user: User,
  ) {
    return this.itemService.createItem(createItemInput, user);
  }

  @Mutation(() => UpdateItemOutput)
  @Role(['ANY'])
  async updateItem(
    @AuthUser() user: User,
    @Args('input') updateItemInput: UpdateItemInput,
  ) {
    return this.itemService.updateItem(user, updateItemInput);
  }

  @Mutation(() => DeleteItemOutput)
  @Role(['ANY'])
  async deleteItem(
    @AuthUser() user: User,
    @Args('input') deleteItemInput: DeleteItemInput,
  ) {
    return this.itemService.deleteItem(user, deleteItemInput);
  }

  @Query(() => GetItemsOutput)
  async getItems(@Args('input') getItemsInput: GetItemsInput) {
    return this.itemService.getItems(getItemsInput);
  }

  @Query(() => Item)
  async getItem(@Args('input') getItemInput: GetItemInput) {
    return this.itemService.getItem(getItemInput);
  }

  @Query(() => GetItemsForOwnerOutput)
  @Role(['ANY'])
  async getItemsForOwner(
    @AuthUser() user: User,
  ): Promise<GetItemsForOwnerOutput> {
    return this.itemService.getItemsForOwner(user);
  }

  @Mutation(() => ApproveItemOutput)
  @Role(['ADMIN'])
  async approveItem(
    @AuthUser() user: User,
    @Args('input') approveItemInput: ApproveItemInput,
  ) {
    return this.itemService.approveItem(user, approveItemInput);
  }

  @Mutation(() => RejectItemOutput)
  @Role(['ADMIN'])
  async rejectItem(
    @AuthUser() user: User,
    @Args('input') rejectItemInput: RejectItemInput,
  ) {
    return this.itemService.rejectItem(user, rejectItemInput);
  }

  @Mutation(() => RequestDeleteItemOutput)
  @Role(['ANY'])
  async requestDeleteItem(
    @AuthUser() user: User,
    @Args('input') requestDeleteItemInput: RequestDeleteItemInput,
  ) {
    return this.itemService.requestDeleteItem(user, requestDeleteItemInput);
  }
}
