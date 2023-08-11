import { MockExamQuestionFeedback } from './mock-exam-question-feedback.entity';
import { User } from 'src/users/entities/user.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IsEnum } from 'class-validator';

export enum QuestionFeedbackRecommendationType {
  GOOD = 'GOOD',
  BAD = 'BAD',
}

registerEnumType(QuestionFeedbackRecommendationType, {
  name: 'QuestionFeedbackRecommendationType',
});

@InputType('MockExamQuestionFeedbackRecommendationInputType', {
  isAbstract: true,
})
@ObjectType()
@Entity()
export class MockExamQuestionFeedbackRecommendation extends CoreEntity {
  @ManyToOne(
    () => MockExamQuestionFeedback,
    (mockExamQuestionFeedback) => mockExamQuestionFeedback.recommendation,
    { onDelete: 'CASCADE' },
  )
  @Field(() => MockExamQuestionFeedback)
  feedback: MockExamQuestionFeedback;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.feedbackRecommendation, {
    onDelete: 'CASCADE',
  })
  user: User;
  @Column({
    type: 'enum',
    enum: QuestionFeedbackRecommendationType,
  })
  @Field(() => QuestionFeedbackRecommendationType)
  @IsEnum(QuestionFeedbackRecommendationType)
  type: QuestionFeedbackRecommendationType;
}
