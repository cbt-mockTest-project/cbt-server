import { User } from 'src/users/entities/user.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';

@InputType('NoticeInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Notice extends CoreEntity {
  @Column()
  @Field(() => String)
  content: string;

  @Column()
  @Field(() => Boolean, { defaultValue: false })
  confirm: boolean;

  @Column({ nullable: true })
  @Field(() => Date, { nullable: true, defaultValue: null })
  reservationTime?: Date;

  @ManyToOne(() => User, (user) => user.notice, {
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  user: User;
}
