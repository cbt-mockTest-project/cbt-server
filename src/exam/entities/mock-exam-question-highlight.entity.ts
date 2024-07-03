import { MockExamQuestion } from './mock-exam-question.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@InputType('MockExamQuestionHighlightInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class MockExamQuestionHighlight extends CoreEntity {
  @Column({ default: '' })
  @Field(() => String)
  questionHtml: string;

  @Column({ default: '' })
  @Field(() => String)
  solutionHtml: string;

  @ManyToOne(
    () => MockExamQuestion,
    (mockExamQuestion) => mockExamQuestion.highlight,
    { onDelete: 'CASCADE' },
  )
  @Field(() => MockExamQuestion)
  question: MockExamQuestion;

  @ManyToOne(() => User, (user) => user.mockExamQuestionHighlight, {
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  user: User;
}
