import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item, ItemStateEnum } from './entities/item.entity';
import { CreateItemInput, CreateItemOutput } from './dtos/createItem.dto';
import { UpdateItemInput, UpdateItemOutput } from './dtos/updateItem.dto';
import { DeleteItemInput, DeleteItemOutput } from './dtos/deleteItem.dto';
import { User, UserRole } from 'src/users/entities/user.entity';
import { GetItemInput, GetItemOutput } from './dtos/getItem.dto';
import { GetItemsInput, GetItemsOutput } from './dtos/getItems.dto';
import { ApproveItemInput, ApproveItemOutput } from './dtos/approveItem.dto';
import { RejectItemInput, RejectItemOutput } from './dtos/rejectItem.dto';
import { GetItemsForOwnerOutput } from './dtos/getItemsForOwner.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly items: Repository<Item>,
  ) {}

  async createItem(
    createItemInput: CreateItemInput,
    user: User,
  ): Promise<CreateItemOutput> {
    try {
      if (!user) {
        return { ok: false, error: 'User not found' };
      }
      const newItem = this.items.create({ ...createItemInput, user });
      if (newItem.price === 0) {
        newItem.state = ItemStateEnum.APPROVED;
      }
      if (newItem.price > 0) {
        newItem.state = ItemStateEnum.PENDING;
      }
      await this.items.save(newItem);
      return { ok: true };
    } catch {
      return { ok: false, error: 'Could not create item' };
    }
  }

  async updateItem(
    user: User,
    updateItemInput: UpdateItemInput,
  ): Promise<UpdateItemOutput> {
    try {
      const item = await this.items.findOne({
        where: { id: updateItemInput.id },
        relations: {
          user: true,
        },
      });
      if (!item) {
        return { ok: false, error: 'Item not found' };
      }
      if (item.user.id !== user.id && user.role !== UserRole.ADMIN) {
        return { ok: false, error: 'You are not authorized' };
      }
      // 무료아이템 -> 유료아이템으로 업데이트 시, 상태를 PENDING으로 변경
      if (item.price === 0 && updateItemInput.price > 0) {
        updateItemInput.state = ItemStateEnum.PENDING;
      }
      await this.items.save({ ...item, ...updateItemInput });
      return { ok: true };
    } catch {
      return { ok: false, error: 'Could not update item' };
    }
  }

  async deleteItem(
    user: User,
    deleteItemInput: DeleteItemInput,
  ): Promise<DeleteItemOutput> {
    try {
      const item = await this.items.findOne({
        where: { id: deleteItemInput.id },
        relations: {
          user: true,
        },
      });
      if (!item) {
        return { ok: false, error: 'Item not found' };
      }
      if (item.user.id !== user.id && user.role !== UserRole.ADMIN) {
        return { ok: false, error: 'You are not authorized' };
      }
      if (item.price > 0) {
        // 유료 아이템은 삭제 불가능
        return { ok: false, error: 'You cannot delete a paid item' };
      }
      await this.items.delete(item);
      return { ok: true };
    } catch {
      return { ok: false, error: 'Could not delete item' };
    }
  }

  async getItem(getItemInput: GetItemInput): Promise<GetItemOutput> {
    try {
      const item = await this.items.findOne({
        where: { id: getItemInput.id },
      });
      if (!item) {
        return { ok: false, error: 'Item not found' };
      }
      return { ok: true, item };
    } catch {
      return { ok: false, error: 'Could not get item' };
    }
  }

  async getItems(getItemsInput: GetItemsInput): Promise<GetItemsOutput> {
    const { page, limit, search } = getItemsInput;
    const formattedSearch = `%${search?.replace(/\s+/g, '').toLowerCase()}%`;
    const query = this.items
      .createQueryBuilder('item')
      .skip((page - 1) * limit)
      .where('item.state = :state', { state: ItemStateEnum.APPROVED })
      .take(limit);
    if (search) {
      query.andWhere(
        "(LOWER(REPLACE(item.title, ' ', '')) LIKE :formattedSearch OR LOWER(REPLACE(item.description, ' ', '')) LIKE :formattedSearch)",
        { formattedSearch },
      );
    }
    const items = await query.getMany();
    return {
      ok: true,
      items,
    };
  }

  async getItemsForOwner(user: User): Promise<GetItemsForOwnerOutput> {
    try {
      const items = await this.items.find({
        where: {
          user: {
            id: user.id,
          },
        },
      });
      return { ok: true, items };
    } catch {
      return { ok: false, error: 'Could not get items' };
    }
  }

  async approveItem(
    user: User,
    approveItemInput: ApproveItemInput,
  ): Promise<ApproveItemOutput> {
    try {
      if (user.role !== UserRole.ADMIN) {
        return { ok: false, error: 'You are not authorized' };
      }
      const item = await this.items.findOne({
        where: { id: approveItemInput.id },
      });
      if (!item) {
        return { ok: false, error: 'Item not found' };
      }
      await this.items.save({ ...item, state: ItemStateEnum.APPROVED });
    } catch {
      return { ok: false, error: 'Could not approve item' };
    }
  }

  async rejectItem(
    user: User,
    rejectItemInput: RejectItemInput,
  ): Promise<RejectItemOutput> {
    try {
      if (user.role !== UserRole.ADMIN) {
        return { ok: false, error: 'You are not authorized' };
      }
      const item = await this.items.findOne({
        where: { id: rejectItemInput.id },
      });
      if (!item) {
        return { ok: false, error: 'Item not found' };
      }
      await this.items.save({ ...item, state: ItemStateEnum.REJECTED });
    } catch {
      return { ok: false, error: 'Could not reject item' };
    }
  }
}
