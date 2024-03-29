import { User } from 'src/users/entities/user.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, ManyToOne } from 'typeorm';
import { MockExam } from 'src/exam/entities/mock-exam.entity';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';

@InputType('ExamCoAuthorInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class ExamCoAuthor extends CoreEntity {
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.examCoAuthor, { onDelete: 'CASCADE' })
  user: User;

  @Field(() => MockExam)
  @ManyToOne(() => MockExam, (mockExam) => mockExam.examCoAuthor)
  exam: MockExam;

  @Field(() => MockExamCategory)
  @ManyToOne(
    () => MockExamCategory,
    (mockExamCategory) => mockExamCategory.examCoAuthor,
  )
  examCategory: MockExamCategory;
}
