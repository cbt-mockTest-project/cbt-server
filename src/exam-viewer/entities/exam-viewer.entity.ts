import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';
import { MockExam } from 'src/exam/entities/mock-exam.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@InputType('ExamViewerInput', { isAbstract: true })
@ObjectType()
@Entity()
export class ExamViewer extends CoreEntity {
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.examViewer, { onDelete: 'CASCADE' })
  user: User;

  @Field(() => MockExam)
  @ManyToOne(() => MockExam, (mockExam) => mockExam.examViewer, {
    nullable: true,
  })
  exam: MockExam;

  @Column({ default: false })
  @Field(() => Boolean)
  isApprove: boolean;

  @Field(() => MockExamCategory)
  @ManyToOne(
    () => MockExamCategory,
    (mockExamCategory) => mockExamCategory.examViewer,
  )
  examCategory: MockExamCategory;
}
