import { User } from 'src/users/entities/user.entity';
import { CoreEntity } from './../../common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';

@InputType('FeedbackInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Feedback extends CoreEntity {
  @Column()
  @Field(() => String)
  content: string;

  @ManyToOne(() => User, (user) => user.feedback, {
    onDelete: 'SET NULL',
  })
  @Field(() => User)
  user: User;
}
