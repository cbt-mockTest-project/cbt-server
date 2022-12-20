import { User } from 'src/users/entities/user.entity';
import { MockExamQuestion } from './mock-exam-question.entity';
import { CoreEntity } from './../../common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';

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
}
