import { MockExam } from './mock-exam.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { MockExamQuestionFeedback } from './mock-exam-question-feedback.entity';
import { MockExamQuestionState } from './mock-exam-question-state.entity';
import { MockExamQuestionComment } from './mock-exam-question-comment.entity';

@InputType('MockExamQuestionImageInputType', { isAbstract: true })
@ObjectType()
export class MockExamImageType {
  @Field(() => String)
  url: string;
  @Field(() => String)
  name: string;
  @Field(() => String)
  uid: string;
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
  @Field(() => [MockExamImageType], { nullable: true })
  question_img: MockExamImageType[];

  @Column({ type: 'json', default: [] })
  @Field(() => [MockExamImageType], { nullable: true })
  solution_img: MockExamImageType[];

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
    () => MockExamQuestionComment,
    (MockExamQuestionComment) => MockExamQuestionComment.question,
  )
  @Field(() => [MockExamQuestionComment])
  mockExamQuestionComment: MockExamQuestionComment[];

  @OneToMany(
    () => MockExamQuestionState,
    (mockExamQuestionState) => mockExamQuestionState.question,
  )
  @Field(() => [MockExamQuestionState])
  state: MockExamQuestionState[];

  @Column({ default: 0 })
  @Field(() => Number)
  number: number;
}
