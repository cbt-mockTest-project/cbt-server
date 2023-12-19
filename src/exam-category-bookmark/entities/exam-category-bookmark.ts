import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { TimeStampedEntity } from 'src/common/entities/core.entity';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@InputType('ExamCategoryBookmarkInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class ExamCategoryBookmark extends TimeStampedEntity {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  categoryId: number;

  @ManyToOne(() => User, (user) => user.examCategoryBookmarks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  @Field(() => User)
  user: User;

  @ManyToOne(
    () => MockExamCategory,
    (category) => category.examCategoryBookmarks,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'categoryId' })
  @Field(() => MockExamCategory)
  category: MockExamCategory;
}
