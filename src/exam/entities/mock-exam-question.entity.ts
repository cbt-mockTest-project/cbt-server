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
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { TextHighlight } from 'src/text-highlight/entites/text-highlight.entity';

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

@InputType('MockExamQuestionObjectiveContentInputType', { isAbstract: true })
@ObjectType()
export class ObjectiveContent {
  @Field(() => String)
  content: string;
  @Field(() => String)
  url: string;
}

@InputType('MockExamQuestionObjectiveInputType', { isAbstract: true })
@ObjectType()
export class ObjectiveData {
  @Field(() => [ObjectiveContent])
  content: ObjectiveContent[];

  @Field(() => Number)
  answer: number;
}

@InputType('MockExamQuestionInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class MockExamQuestion extends CoreEntity {
  @Column({ default: () => 'uuid_generate_v4()', unique: true })
  @Field(() => String)
  orderId: string;

  @Column()
  @Field(() => String, { nullable: true, defaultValue: '' })
  question?: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true, defaultValue: '' })
  solution?: string;

  @Column({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  approved: boolean;

  @Column({ default: '' })
  @Field(() => String, { nullable: true, defaultValue: '' })
  label?: string;

  @Column({ type: 'json', default: null })
  @Field(() => ObjectiveData, { nullable: true })
  objectiveData: ObjectiveData;

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

  @Column({ default: 0 })
  @Field(() => Number, { defaultValue: 0 })
  highScore?: number;

  @Column({ default: 0 })
  @Field(() => Number, { defaultValue: 0 })
  middleScore?: number;

  @Column({ default: 0 })
  @Field(() => Number, { defaultValue: 0 })
  lowScore?: number;

  @Field(() => [MockExamQuestionBookmark])
  @OneToMany(
    () => MockExamQuestionBookmark,
    (mockExamQuestionBookmark) => mockExamQuestionBookmark.question,
    {
      onDelete: 'SET NULL',
    },
  )
  mockExamQuestionBookmark: MockExamQuestionBookmark[];

  @Field(() => [Quiz])
  @OneToMany(() => Quiz, (quiz) => quiz.question)
  quiz: Quiz[];

  @Field(() => [TextHighlight])
  @OneToMany(() => TextHighlight, (textHighlight) => textHighlight.question)
  textHighlight: TextHighlight[];

  @ManyToOne(() => User, (user) => user.mockExamQuestion, {
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  user: User;

  @Field(() => QuestionState, {
    nullable: true,
    defaultValue: QuestionState.CORE,
  })
  myQuestionState?: QuestionState = QuestionState.CORE;

  @Field(() => Number, {
    nullable: true,
    defaultValue: 0,
  })
  myObjectiveAnswer?: number = 0;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  isBookmarked?: boolean = false;

  @Field(() => MockExamQuestionBookmark, { nullable: true, defaultValue: null })
  myBookmark?: MockExamQuestionBookmark = null;

  @Field(() => Number, { nullable: true, defaultValue: 0 })
  commentCount?: number = 0;

  @Column({ type: 'json', default: [] })
  @Field(() => [Number], { nullable: true, defaultValue: [] })
  linkedQuestionIds?: number[];
}
