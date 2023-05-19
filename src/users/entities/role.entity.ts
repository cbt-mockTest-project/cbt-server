import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserAndRole } from './userAndRole.entity';

@InputType('RoleInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Role extends CoreEntity {
  @Column()
  @Field(() => String)
  name: string;

  @OneToMany(() => UserAndRole, (userRole) => userRole.role)
  @Field(() => [UserAndRole])
  userRoles: UserAndRole[];
}
