import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { UserAndRole } from './userAndRole.entity';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';

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

  @ManyToMany(
    () => MockExamCategory,
    (mockExamCategory) => mockExamCategory.roles,
  )
  @Field(() => [MockExamCategory])
  mockExamCategories: MockExamCategory[];
}
