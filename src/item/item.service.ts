import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
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
import {
  ItemRevision,
  ItemRevisionStateEnum,
} from './entities/item-revision.entity';
import { omit } from 'lodash';
import {
  RequestDeleteItemInput,
  RequestDeleteItemOutput,
} from './dtos/requestDeleteItem.dto';
import {
  GetItemRevisionInput,
  GetItemRevisionOutput,
} from './dtos/getItemRevision.dto';
import { GetApprovedItemIdsAndsSlugsOutput } from './dtos/getApprovedItemIdsAndSlugs.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly items: Repository<Item>,
    @InjectRepository(ItemRevision)
    private readonly itemRevisions: Repository<ItemRevision>,
  ) {}

  async createItem(
    createItemInput: CreateItemInput,
    user: User,
  ): Promise<CreateItemOutput> {
    try {
      const { categoryId, ...itemData } = createItemInput;
      // 중복된 타이틀이 있는지 확인
      const exists = await this.items.findOne({
        where: [{ title: itemData.title }, { urlSlug: itemData.title }],
      });
      if (exists) {
        return { ok: false, error: '제목이 중복됩니다.' };
      }
      if (!user) {
        return { ok: false, error: 'User not found' };
      }
      const createItemData: DeepPartial<Item> = {
        ...itemData,
        user,
      };
      if (categoryId) {
        createItemData.category = { id: categoryId };
      }
      const newItem = this.items.create(createItemData);
      let item: Item;
      if (newItem.price === 0) {
        newItem.state = ItemStateEnum.APPROVED;
        item = await this.items.save(newItem);
      }
      if (newItem.price > 0) {
        newItem.state = ItemStateEnum.PENDING;
        item = await this.items.save(newItem);
      }
      const newItemRevision = omit(newItem, ['id', 'state']);
      await this.itemRevisions.save({
        ...newItemRevision,
        state:
          newItemRevision.price === 0
            ? ItemRevisionStateEnum.APPROVED
            : ItemRevisionStateEnum.PENDING,
        item: { id: item.id },
      });
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
      const { categoryId, ...itemData } = updateItemInput;
      const exists = await this.items.findOne({
        where: [{ title: itemData.title }, { urlSlug: itemData.title }],
      });

      const item = await this.items.findOne({
        where: { id: updateItemInput.id },
        relations: {
          user: true,
          category: true,
        },
      });
      if (!item) {
        return { ok: false, error: 'Item not found' };
      }
      if (exists && exists.id !== item.id) {
        return { ok: false, error: '제목이 중복됩니다.' };
      }
      const isFree = item.price === 0 && itemData.price === 0;
      if (item.user.id !== user.id && user.role !== UserRole.ADMIN) {
        return { ok: false, error: 'You are not authorized' };
      }
      const updateItemData: DeepPartial<Item> = {
        ...itemData,
        user,
      };
      if (categoryId) {
        updateItemData.category = { id: categoryId };
      }
      const existingItemRevision = await this.itemRevisions.findOne({
        where: {
          item: {
            id: updateItemInput.id,
          },
        },
      });
      const newItemRevision = {
        ...omit(item, ['state', 'id']),
        ...updateItemData,
        item: {
          id: updateItemInput.id,
        },
      };
      if (!existingItemRevision) {
        return { ok: false, error: 'ItemRevision not found' };
      }

      if (existingItemRevision) {
        await this.itemRevisions.save({
          ...existingItemRevision,
          ...newItemRevision,
          id: existingItemRevision.id,
          state: isFree
            ? ItemRevisionStateEnum.APPROVED
            : ItemRevisionStateEnum.PENDING,
        });
      }

      //  무료일 경우 바로 업데이트
      if (isFree) {
        await this.items.save({ ...item, ...updateItemData });
      }

      return { ok: true };
    } catch (e) {
      console.log(e);
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
      const { id, urlSlug } = getItemInput;
      const where: FindOptionsWhere<Item> = {};
      if (id) {
        where.id = id;
      }
      if (urlSlug) {
        where.urlSlug = urlSlug;
      }
      const item = await this.items.findOne({
        where,
        relations: {
          user: true,
          category: true,
        },
      });
      if (!item) {
        return { ok: false, error: 'Item not found' };
      }
      return { ok: true, item };
    } catch {
      return { ok: false, error: 'Could not get item' };
    }
  }

  async getItemRevision(
    user: User,
    getItemRevisionInput: GetItemRevisionInput,
  ): Promise<GetItemRevisionOutput> {
    try {
      const itemRevision = await this.itemRevisions.findOne({
        where: { id: getItemRevisionInput.id },
        relations: {
          user: true,
          item: true,
          category: true,
        },
      });
      if (!itemRevision) {
        return { ok: false, error: 'Item not found' };
      }
      if (itemRevision.user.id !== user.id && user.role !== UserRole.ADMIN) {
        return { ok: false, error: 'You are not authorized' };
      }
      return { ok: true, itemRevision };
    } catch {
      return { ok: false, error: 'Could not get item' };
    }
  }

  async getItems(getItemsInput: GetItemsInput): Promise<GetItemsOutput> {
    const { page, limit, search } = getItemsInput;
    const formattedSearch = `%${search?.replace(/\s+/g, '').toLowerCase()}%`;
    const totalCount = await this.items.count({
      where: {
        state: ItemStateEnum.APPROVED,
      },
    });
    const query = this.items
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.user', 'user')
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
      totalCount,
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
    const queryRunner = this.items.manager.connection.createQueryRunner();
    try {
      if (user.role !== UserRole.ADMIN) {
        return { ok: false, error: 'You are not authorized' };
      }
      const itemRevision = await this.itemRevisions.findOne({
        where: { id: approveItemInput.id },
        relations: { item: true, user: true, category: true },
      });
      if (!itemRevision) {
        return { ok: false, error: 'ItemRevision not found' };
      }
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const newItem: DeepPartial<Item> = {
        ...omit(itemRevision, 'id'),
        state: ItemStateEnum.APPROVED,
      };
      if (itemRevision.item) {
        newItem.id = itemRevision.item.id;
      }

      await queryRunner.manager.save(Item, newItem);
      await queryRunner.manager.update(ItemRevision, itemRevision.id, {
        state: ItemRevisionStateEnum.APPROVED,
      });
      await queryRunner.commitTransaction();
      return {
        ok: true,
      };
    } catch (e) {
      await queryRunner.rollbackTransaction();
      return { ok: false, error: 'Could not approve item' };
    } finally {
      await queryRunner.release();
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
      const item = await this.itemRevisions.findOne({
        where: { id: rejectItemInput.id },
      });
      if (!item) {
        return { ok: false, error: 'Item not found' };
      }
      await this.itemRevisions.save({
        ...item,
        state: ItemRevisionStateEnum.REJECTED,
      });
    } catch {
      return { ok: false, error: 'Could not reject item' };
    }
  }

  async requestDeleteItem(
    user: User,
    requestDeleteItemInput: RequestDeleteItemInput,
  ): Promise<RequestDeleteItemOutput> {
    try {
      const item = await this.items.findOne({
        where: { id: requestDeleteItemInput.itemId },
        relations: {
          user: true,
          category: true,
        },
      });
      if (!item) {
        return { ok: false, error: 'Item not found' };
      }
      if (item.user.id !== user.id && user.role !== UserRole.ADMIN) {
        return { ok: false, error: 'You are not authorized' };
      }
      const itemRevision = await this.itemRevisions.findOne({
        where: {
          item: {
            id: item.id,
          },
        },
      });
      if (!itemRevision) {
        await this.itemRevisions.save({
          ...omit(item, 'id'),
          state: ItemRevisionStateEnum.REQUEST_DELETION,
          item: {
            id: item.id,
          },
        });
      } else {
        await this.itemRevisions.update(itemRevision.id, {
          state: ItemRevisionStateEnum.REQUEST_DELETION,
        });
      }
      return { ok: true };
    } catch {
      return { ok: false, error: 'Could not request delete item' };
    }
  }

  async getApprovedItemIdsAndsSlugs(): Promise<GetApprovedItemIdsAndsSlugsOutput> {
    try {
      const items = await this.items.find({
        where: { state: ItemStateEnum.APPROVED },
        select: ['id', 'urlSlug'],
      });
      return {
        ok: true,
        ids: items.map((item) => item.id),
        slugs: items.map((item) => item.urlSlug),
      };
    } catch {
      return { ok: false, error: 'Could not get approved item ids' };
    }
  }
}
