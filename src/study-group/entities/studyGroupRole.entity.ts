import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@InputType('StudyGroupRoleInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class StudyGroupRole extends CoreEntity {
  @Column()
  @Field(() => String)
  name: string;

  @ManyToMany(() => User, (user) => user.studyGroupRoles)
  @Field(() => [User])
  users: User[];
}
