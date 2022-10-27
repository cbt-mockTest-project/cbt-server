import { MockExam } from './mock-exam.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { MockExamQuestionFeedback } from './mock-exam-question-feedback.entity';
import { MockExamQuestionState } from './mock-exam-question-state.entity';

@InputType('MockExamQuestionImageInputType', { isAbstract: true })
@ObjectType()
export class MockExamQuestionImage {
  @Field(() => String)
  url: string;
}

@InputType('MockExamQuestionInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class MockExamQuestion extends CoreEntity {
  @Column()
  @Field(() => String)
  question: string;

  @Column()
  @Field(() => String)
  solution: string;

  @Column()
  @Field(() => Boolean)
  approved: boolean;

  @Column({ type: 'json', default: [] })
  @Field(() => [MockExamQuestionImage], { nullable: true })
  question_img: MockExamQuestionImage[];

  @Column({ type: 'json', default: [] })
  @Field(() => [MockExamQuestionImage], { nullable: true })
  solution_img: MockExamQuestionImage[];

  @Field(() => MockExam)
  @ManyToOne(() => MockExam, (mockExam) => mockExam.mockExamQuestion)
  mockExam: MockExam;

  @RelationId((mockExamQusetion: MockExamQuestion) => mockExamQusetion.mockExam)
  mockExamId: number;

  @OneToMany(
    () => MockExamQuestionFeedback,
    (mockExamQuestionFeedback) => mockExamQuestionFeedback.mockExamQuestion,
  )
  @Field(() => [MockExamQuestionFeedback])
  mockExamQuestionFeedback: MockExamQuestionFeedback[];

  @OneToMany(
    () => MockExamQuestionState,
    (mockExamQuestionState) => mockExamQuestionState.mockExamQuestion,
  )
  @Field(() => [MockExamQuestionState])
  state: MockExamQuestionState[];

  @Column({ default: 0 })
  @Field(() => Number)
  number: number;
}
