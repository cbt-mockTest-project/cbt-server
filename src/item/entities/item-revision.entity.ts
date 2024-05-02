import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Item, ItemFileType } from './item.entity';
import { IsEnum } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';

export enum ItemRevisionStateEnum {
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PENDING = 'PENDING',
  REQUEST_DELETION = 'REQUEST_DELETION',
}

registerEnumType(ItemRevisionStateEnum, { name: 'ItemRevisionStateEnum' });

@InputType('ItemRevisionInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class ItemRevision extends CoreEntity {
  @Field(() => Number)
  @Column()
  price: number;

  @Field(() => String, { nullable: true, defaultValue: null })
  @Column({ nullable: true, default: null })
  thumbnail?: string;

  @Column({ nullable: true, type: 'json', default: null })
  @Field(() => ItemFileType, { nullable: true })
  file: ItemFileType;

  @Column()
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

  @Field(() => ItemRevisionStateEnum)
  @Column({
    type: 'enum',
    enum: ItemRevisionStateEnum,
    default: ItemRevisionStateEnum.PENDING,
  })
  @IsEnum(ItemRevisionStateEnum)
  state: ItemRevisionStateEnum;

  @ManyToOne(() => User, (user) => user.items, { onDelete: 'CASCADE' })
  @Field(() => User)
  user: User;

  @ManyToOne(() => MockExamCategory, (category) => category.items, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @Field(() => MockExamCategory, { nullable: true })
  category?: User;

  @JoinColumn()
  @OneToOne(() => Item)
  @Field(() => Item)
  item: Item;
}
