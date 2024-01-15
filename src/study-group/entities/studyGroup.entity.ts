import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, ManyToMany, OneToMany } from 'typeorm';

@InputType('StudyGroupInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class StudyGroup extends CoreEntity {
  @Field(() => User)
  @ManyToMany(() => User, (user) => user.studyGroups, {
    onDelete: 'CASCADE',
  })
  users: User[];

  @Field(() => MockExamCategory)
  @OneToMany(
    () => MockExamCategory,
    (mockExamCategory) => mockExamCategory.studyGroup,
  )
  mockExamCategories: MockExamCategory[];
}
