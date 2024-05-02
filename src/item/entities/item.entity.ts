import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ItemSalesHistory } from './item-sales-history.entity';

export enum ItemStateEnum {
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PENDING = 'PENDING',
}

registerEnumType(ItemStateEnum, { name: 'ItemStateEnum' });

@InputType('ItemFileInputType', { isAbstract: true })
@ObjectType()
export class ItemFileType {
  @Field(() => String)
  name: string;
  @Field(() => String)
  type: string;
  @Field(() => Number)
  size: number;
  @Field(() => String)
  uid: string;
}

@InputType('ItemInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Item extends CoreEntity {
  @Field(() => Number)
  @Column()
  price: number;

  @Field(() => String, { nullable: true, defaultValue: null })
  @Column({ nullable: true, default: null })
  thumbnail?: string;

  @Column({ nullable: true, type: 'json', default: null })
  @Field(() => ItemFileType, { nullable: true })
  file: ItemFileType;

  @Column({ unique: true })
  @Field(() => String)
  title: string;

  @Column({ unique: true })
  @Field(() => String)
  urlSlug: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => String)
  contents: string;

  @Field(() => ItemStateEnum)
  @Column({
    type: 'enum',
    enum: ItemStateEnum,
    default: ItemStateEnum.PENDING,
  })
  @IsEnum(ItemStateEnum)
  state: ItemStateEnum;

  @ManyToOne(() => User, (user) => user.items, { onDelete: 'CASCADE' })
  @Field(() => User)
  user: User;

  @ManyToOne(() => MockExamCategory, (category) => category.items, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @Field(() => MockExamCategory, { nullable: true })
  category?: User;

  @OneToMany(
    () => ItemSalesHistory,
    (itemSalesHistory) => itemSalesHistory.item,
  )
  @Field(() => [ItemSalesHistory])
  itemSalesHistory: ItemSalesHistory[];
}
