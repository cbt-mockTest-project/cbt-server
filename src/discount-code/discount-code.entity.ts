import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

export enum DiscountCodeType {
  MOUD_CBT = 'MOUD_CBT',
  EHS_MASTER = 'EHS_MASTER',
}

export enum DiscountCodeStatus {
  USED = 'USED',
  PENDING = 'PENDING',
  UNUSED = 'UNUSED',
}

registerEnumType(DiscountCodeType, { name: 'DiscountCodeType' });
registerEnumType(DiscountCodeStatus, { name: 'DiscountCodeStatus' });

@InputType('Discountcode', { isAbstract: true })
@ObjectType()
@Entity()
export class DiscountCode extends CoreEntity {
  @Column({ unique: true })
  @Field(() => String)
  code: string;

  @Column({
    type: 'enum',
    enum: DiscountCodeType,
    default: DiscountCodeType.MOUD_CBT,
  })
  @Field(() => DiscountCodeType)
  type: DiscountCodeType;

  @ManyToOne(() => User, (user) => user.discountCode, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @Field(() => User)
  user?: User;

  @Column({
    type: 'enum',
    enum: DiscountCodeStatus,
    default: DiscountCodeStatus.UNUSED,
  })
  @Field(() => DiscountCodeStatus)
  status: DiscountCodeStatus;
}
