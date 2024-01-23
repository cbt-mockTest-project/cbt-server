import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Role } from './role.entity';
import { User } from './user.entity';

@InputType('UserRoleInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class UserAndRole extends CoreEntity {
  @ManyToOne(() => Role, (role) => role.userRoles)
  @Field(() => Role)
  role: Role;

  @ManyToOne(() => User, (user) => user.userRoles, { onDelete: 'CASCADE' })
  @Field(() => User, { nullable: true })
  user: User;

  @Column({ default: 0 })
  @Field(() => Number, { defaultValue: 0 })
  price: number;
}
