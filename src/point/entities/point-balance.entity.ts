import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@InputType('PointBalanceInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class PointBalance extends CoreEntity {
  @Field(() => Number)
  @Column()
  balance: number;

  @OneToOne(() => User, (user) => user.pointBalance, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  @Field(() => User)
  user: User;
}
