import { MockExamQuestion } from './mock-exam-question.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { IsEnum } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { MockExam } from './mock-exam.entity';

export enum QuestionState {
  ROW = 'ROW',
  MIDDLE = 'MIDDLE',
  HIGH = 'HIGH',
  CORE = 'CORE',
  EXCLUDE = 'EXCLUDE',
}

registerEnumType(QuestionState, { name: 'QuestionState' });

@InputType('MockExamQuestionStateInputType', { isAbstract: true })
@ObjectType()
@Entity()
@Unique(['user', 'question'])
export class MockExamQuestionState extends CoreEntity {
  @Field(() => QuestionState)
  @Column({ type: 'enum', enum: QuestionState, default: QuestionState.CORE })
  @IsEnum(QuestionState)
  state: QuestionState;

  @Column({ default: 0 })
  @Field(() => Number)
  answer: number;

  @ManyToOne(
    () => MockExamQuestion,
    (mockExamQuestion) => mockExamQuestion.state,
    { onDelete: 'CASCADE' },
  )
  @Field(() => MockExamQuestion)
  question: MockExamQuestion;

  @ManyToOne(() => User, (user) => user.mockExamQuestionState, {
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  user: User;

  @ManyToOne(() => MockExam, (exam) => exam.mockExamQuestionState, {
    onDelete: 'CASCADE',
  })
  @Field(() => MockExam)
  exam: MockExam;
}
