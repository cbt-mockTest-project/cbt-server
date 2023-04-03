import { User } from 'src/users/entities/user.entity';
import { MockExamQuestion } from './mock-exam-question.entity';
import { CoreEntity } from './../../common/entities/core.entity';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { IsEnum } from 'class-validator';
import { MockExamQuestionFeedbackRecommendation } from './mock-exam-question-feedback-recommendation.entity';

export enum QuestionFeedbackType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  REPORT = 'REPORT',
}
@ObjectType()
export class RecommendationCount {
  @Field(() => Number, { defaultValue: 0 })
  good: number;

  @Field(() => Number, { defaultValue: 0 })
  bad: number;
}

@ObjectType()
export class MyRecommedationStatus {
  @Field(() => Boolean, { defaultValue: false })
  isGood: boolean;

  @Field(() => Boolean, { defaultValue: false })
  isBad: boolean;
}

registerEnumType(QuestionFeedbackType, { name: 'QuestionFeedbackType' });
@InputType('MockExamQuestionFeedbackInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class MockExamQuestionFeedback extends CoreEntity {
  @Column()
  @Field(() => String)
  content: string;

  @ManyToOne(
    () => MockExamQuestion,
    (mockExamQuestion) => mockExamQuestion.mockExamQuestionFeedback,
    {
      onDelete: 'CASCADE',
    },
  )
  @Field(() => MockExamQuestion)
  mockExamQuestion: MockExamQuestion;

  @ManyToOne(() => User, (user) => user.questionFeedback, {
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  user: User;

  @OneToMany(
    () => MockExamQuestionFeedbackRecommendation,
    (feedbackRecommendation) => feedbackRecommendation.feedback,
  )
  @Field(() => [MockExamQuestionFeedbackRecommendation])
  recommendation: MockExamQuestionFeedbackRecommendation[];

  @Column({
    type: 'enum',
    enum: QuestionFeedbackType,
    default: QuestionFeedbackType.PUBLIC,
  })
  @Field(() => QuestionFeedbackType)
  @IsEnum(QuestionFeedbackType)
  type: QuestionFeedbackType;

  @Field(() => RecommendationCount)
  recommendationCount: RecommendationCount;

  @Field(() => MyRecommedationStatus)
  myRecommedationStatus: MyRecommedationStatus;
}
