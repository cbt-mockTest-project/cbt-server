import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

export enum TransactionType {
  ACCUMULATION = 'ACCUMULATION',
  USE = 'USE',
  WITHDRAW = 'WITHDRAW',
}

registerEnumType(TransactionType, { name: 'TransactionType' });

@InputType('PointTransactionInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class PointTransaction extends CoreEntity {
  @Column()
  @Field(() => Number)
  point: number;

  @Field(() => TransactionType)
  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  type: TransactionType;

  @Field(() => String)
  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.pointTransactions, {
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  user: User;
}
