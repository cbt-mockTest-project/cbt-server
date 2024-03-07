import { CoreEntity } from './../../common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Entity, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@InputType('VisitInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Visit extends CoreEntity {
  @ManyToOne(() => User, (user) => user.visit, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @Field(() => User)
  user?: User;
}
