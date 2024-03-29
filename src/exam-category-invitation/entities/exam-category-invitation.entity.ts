import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, ManyToOne } from 'typeorm';

@InputType('ExamCategoryInvitationInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class ExamCategoryInvitation extends CoreEntity {
  @ManyToOne(
    () => MockExamCategory,
    (category) => category.examCategoryInvitations,
    {
      onDelete: 'CASCADE',
    },
  )
  @Field(() => MockExamCategory)
  category: MockExamCategory;

  @ManyToOne(() => User, (user) => user.examCategoryInvitations, {
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  user: User;
}
