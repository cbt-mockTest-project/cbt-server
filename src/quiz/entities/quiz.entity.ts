import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';
import { MockExamQuestion } from 'src/exam/entities/mock-exam-question.entity';
import { MockExam } from 'src/exam/entities/mock-exam.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { QuizComment } from './quizComment.entity';

@InputType('QuizInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Quiz extends CoreEntity {
  @Column()
  @Field(() => String)
  date: string;

  @ManyToOne(
    () => MockExamQuestion,
    (mockExamQuestion) => mockExamQuestion.quiz,
  )
  @Field(() => MockExamQuestion)
  question: MockExamQuestion;

  @ManyToOne(
    () => MockExamCategory,
    (mockExamCategory) => mockExamCategory.quiz,
  )
  @Field(() => MockExamCategory)
  category: MockExamCategory;

  @ManyToOne(() => MockExam, (mockExam) => mockExam.quiz)
  @Field(() => MockExam)
  exam: MockExam;

  @OneToMany(() => QuizComment, (quizComment) => quizComment.quiz)
  @Field(() => [QuizComment])
  comment: QuizComment[];
}
