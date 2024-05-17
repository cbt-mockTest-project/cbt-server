import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

export enum SettlementRequestStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

registerEnumType(SettlementRequestStatus, { name: 'SettlementRequestStatus' });

@InputType('SettlementRequestInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class SettlementRequest extends CoreEntity {
  @Field(() => String)
  @Column()
  bankName: string;

  @Field(() => String)
  @Column()
  accountNumber: string;

  @Field(() => String)
  @Column()
  accountHolder: string;

  @Field(() => Number)
  @Column()
  amount: number;

  @ManyToOne(() => User, (user) => user.settlementRequests)
  @Field(() => User)
  user: User;

  @Field(() => SettlementRequestStatus)
  @Column({
    type: 'enum',
    enum: SettlementRequestStatus,
    default: SettlementRequestStatus.Pending,
  })
  status: SettlementRequestStatus;
}
