import { MockExamCategory } from './../../mock-exams/entities/mock-exam-category.entity';
import { User } from 'src/users/entities/user.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, ManyToOne } from 'typeorm';
import { MockExam } from 'src/mock-exams/entities/mock-exam.entity';

@InputType('ExamCoAuthorInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class ExamCoAuthor extends CoreEntity {
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.examCoAuthor)
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
