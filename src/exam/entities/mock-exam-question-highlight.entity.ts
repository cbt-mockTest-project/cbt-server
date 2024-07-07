import { MockExamQuestion } from './mock-exam-question.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@InputType('HighlightInputType', { isAbstract: true })
@ObjectType()
export class HighlightItemType {
  @Field(() => String)
  id: string;

  @Field(() => Number)
  startOffset: number;

  @Field(() => Number)
  endOffset: number;

  @Field(() => String)
  text: string;

  @Field(() => Number)
  top: number;

  @Field(() => Number)
  left: number;

  @Field(() => Number)
  width: number;

  @Field(() => Number)
  height: number;
}

@InputType('MockExamQuestionHighlightInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class MockExamQuestionHighlight extends CoreEntity {
  @Column({ type: 'json', default: [] })
  @Field(() => [HighlightItemType])
  questionHighlights: HighlightItemType[];

  @Column({ type: 'json', default: [] })
  @Field(() => [HighlightItemType])
  solutionHighlights: HighlightItemType[];

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
