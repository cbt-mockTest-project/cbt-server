import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

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

  @ManyToOne(() => User, (user) => user.payments)
  @Field(() => User)
  user: User;
}
