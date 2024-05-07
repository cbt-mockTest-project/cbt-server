import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { ItemSalesHistory } from 'src/item/entities/item-sales-history.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@InputType('PayInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Payment extends CoreEntity {
  @Column()
  @Field(() => String)
  orderId: string;

  @Column()
  @Field(() => Number)
  price: number;

  @Column()
  @Field(() => String)
  productName: string;

  @Column()
  @Field(() => String)
  receiptId: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  receiptUrl: string;

  @ManyToOne(() => User, (user) => user.payments, { onDelete: 'CASCADE' })
  @Field(() => User)
  user: User;

  @OneToMany(
    () => ItemSalesHistory,
    (itemSalesHistory) => itemSalesHistory.payment,
  )
  @Field(() => [ItemSalesHistory])
  itemSalesHistories: ItemSalesHistory[];
}
