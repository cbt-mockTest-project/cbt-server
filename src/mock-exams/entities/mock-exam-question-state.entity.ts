import { MockExamQuestion } from './mock-exam-question.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IsEnum } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { MockExam } from './mock-exam.entity';

export enum QuestionState {
  ROW = 'ROW',
  MIDDLE = 'MIDDLE',
  HIGH = 'HIGH',
  CORE = 'CORE',
}

registerEnumType(QuestionState, { name: 'QuestionState' });

@InputType('MockExamQuestionStateInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class MockExamQuestionState extends CoreEntity {
  @Field(() => QuestionState)
  @Column({ type: 'enum', enum: QuestionState, default: QuestionState.CORE })
  @IsEnum(QuestionState)
  state: QuestionState;

  @Column({ default: '' })
  @Field(() => String)
  answer: string;

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

  @ManyToOne(() => MockExam, (exam) => exam.mockExamQuestionState)
  @Field(() => MockExam)
  exam: MockExam;
}
