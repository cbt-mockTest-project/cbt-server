import { MockExam } from './mock-exam.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { MockExamQuestionFeedback } from './mock-exam-question-feedback.entity';

@InputType('MockExamQuestionInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class MockExamQuestion extends CoreEntity {
  @Column()
  @Field(() => Number)
  number: number;

  @Column()
  @Field(() => String)
  question: string;

  @Column()
  @Field(() => String)
  solution: string;

  @Column()
  @Field(() => Boolean)
  approved: boolean;

  @Column('simple-array', { array: true })
  @Field(() => [String], { nullable: true })
  question_img: string[];

  @Column('simple-array', { array: true })
  @Field(() => [String], { nullable: true })
  solution_img: string[];

  @Field(() => MockExam)
  @ManyToOne(() => MockExam, (mockExam) => mockExam.mockExamQuestion)
  mockExam: MockExam;

  @OneToMany(
    () => MockExamQuestionFeedback,
    (mockExamQuestionFeedback) => mockExamQuestionFeedback.mockExamQuestion,
  )
  @Field(() => [MockExamQuestionFeedback])
  mockExamQuestionFeedback: MockExamQuestionFeedback[];
}
