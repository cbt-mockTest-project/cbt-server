import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, ManyToOne, Column } from 'typeorm';
import { Item } from './item.entity';
import { User } from 'src/users/entities/user.entity';
import { Payment } from 'src/payments/entities/payment.entity';

@InputType('ItemSalesHistoryInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class ItemSalesHistory extends CoreEntity {
  @ManyToOne(() => Item, (item) => item.itemSalesHistory, {
    onDelete: 'SET NULL',
  })
  @Field(() => Item)
  item: Item;

  @ManyToOne(() => User, (user) => user.itemSalesHistories, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @Field(() => User, { nullable: true })
  buyer?: User;

  @ManyToOne(() => Payment, (payment) => payment.itemSalesHistories, {
    nullable: true,
  })
  @Field(() => Payment, { nullable: true })
  payment?: Payment;
}
