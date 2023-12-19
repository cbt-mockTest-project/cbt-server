import { MockExam } from './mock-exam.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  RelationId,
} from 'typeorm';
import { MockExamQuestionFeedback } from './mock-exam-question-feedback.entity';
import {
  MockExamQuestionState,
  QuestionState,
} from './mock-exam-question-state.entity';
import { MockExamQuestionComment } from './mock-exam-question-comment.entity';
import { MockExamQuestionBookmark } from './mock-exam-question-bookmark.entity';
import { MockExamQuestionMultipleChoice } from './mock-exam-question-multiple-choice.entity';
import { User } from 'src/users/entities/user.entity';

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
@InputType('MockExamQuestionVideoInputType', { isAbstract: true })
@ObjectType()
export class MockExamVideoType {
  @Field(() => String)
  url: string;
  @Field(() => Number)
  size: number;
}

@InputType('MockExamQuestionInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class MockExamQuestion extends CoreEntity {
  @Column()
  @Field(() => String, { nullable: true, defaultValue: '' })
  question?: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true, defaultValue: '' })
  solution?: string;

  @Column()
  @Field(() => Boolean)
  approved: boolean;

  @Column({ default: '' })
  @Field(() => String, { nullable: true, defaultValue: '' })
  label?: string;

  @Column({ type: 'json', default: [] })
  @Field(() => [MockExamVideoType], { nullable: true })
  question_video: MockExamVideoType[];

  @Column({ type: 'json', default: [] })
  @Field(() => [MockExamImageType], { nullable: true })
  question_img: MockExamImageType[];

  @Column({ type: 'json', default: [] })
  @Field(() => [MockExamImageType], { nullable: true })
  solution_img: MockExamImageType[];

  @Field(() => MockExam, { nullable: true })
  @ManyToOne(() => MockExam, (mockExam) => mockExam.mockExamQuestion, {
    onDelete: 'CASCADE',
  })
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

  @JoinColumn()
  @OneToOne(
    () => MockExamQuestionMultipleChoice,
    (multipleChoice) => multipleChoice.question,
    {
      onDelete: 'SET NULL',
    },
  )
  @Field(() => [MockExamQuestionMultipleChoice])
  multipleChoice: MockExamQuestionMultipleChoice[];

  @Column({ default: 0 })
  @Field(() => Number)
  number: number;

  @Field(() => [MockExamQuestionBookmark])
  @OneToMany(
    () => MockExamQuestionBookmark,
    (mockExamQuestionBookmark) => mockExamQuestionBookmark.question,
    {
      onDelete: 'SET NULL',
    },
  )
  mockExamQuestionBookmark: MockExamQuestionBookmark[];

  @ManyToOne(() => User, (user) => user.mockExamQuestion, {
    onDelete: 'SET NULL', // user 삭제될시  mockExam's userId가 null
  })
  @Field(() => User)
  user: User;

  @Field(() => QuestionState, {
    nullable: true,
    defaultValue: QuestionState.CORE,
  })
  myQuestionState?: QuestionState = QuestionState.CORE;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  isBookmarked?: boolean = false;

  @Field(() => Number, { nullable: true, defaultValue: 0 })
  commentCount?: number = 0;
}
