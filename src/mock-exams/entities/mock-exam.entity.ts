import { ExamCoAuthor } from './../../exam-co-author/entities/exam-co-author.entity';
import { User } from 'src/users/entities/user.entity';
import { MockExamCategory } from './mock-exam-category.entity';
import { CoreEntity } from './../../common/entities/core.entity';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { MockExamQuestion } from './mock-exam-question.entity';
import { MockExamQuestionState } from './mock-exam-question-state.entity';
import { IsEnum } from 'class-validator';
import { MockExamHistory } from './mock-exam-history';

export enum ExamStatus {
  UNSET = 'UNSET',
  REQUEST = 'REQUEST',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

registerEnumType(ExamStatus, { name: 'ExamStatus' });

@InputType('MockExamInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class MockExam extends CoreEntity {
  @Column({ unique: true })
  @Field(() => String)
  title: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  slug: string;

  @Column()
  @Field(() => Boolean, { defaultValue: false })
  approved: boolean;

  @Field(() => MockExamCategory)
  @ManyToOne(
    () => MockExamCategory,
    (mockExamCategory) => mockExamCategory.mockExam,
    {
      onDelete: 'SET NULL', // category 삭제될시  mockExam's categoryId가 null
    },
  )
  mockExamCategory: MockExamCategory;

  @Field(() => [MockExamQuestion])
  @OneToMany(
    () => MockExamQuestion,
    (mockExamQuestion) => mockExamQuestion.mockExam,
    {
      onDelete: 'SET NULL',
    },
  )
  mockExamQuestion: MockExamQuestion[];

  @Field(() => [MockExamQuestion])
  @OneToMany(
    () => MockExamQuestionState,
    (mockExamQuestionState) => mockExamQuestionState.exam,
    {
      onDelete: 'SET NULL',
    },
  )
  mockExamQuestionState: MockExamQuestionState[];

  @Field(() => [MockExamHistory])
  @OneToMany(() => MockExamHistory, (MockExamHistory) => MockExamHistory.exam, {
    onDelete: 'SET NULL',
  })
  history: MockExamHistory[];

  @Field(() => [ExamCoAuthor], { nullable: true })
  @OneToMany(() => ExamCoAuthor, (examCoAuthor) => examCoAuthor.exam, {
    onDelete: 'SET NULL',
  })
  examCoAuthor: ExamCoAuthor[];

  @ManyToOne(() => User, (user) => user.mockExam, {
    onDelete: 'SET NULL',
  })
  @Field(() => User)
  user: User;

  @Column({ type: 'enum', enum: ExamStatus, default: ExamStatus.UNSET })
  @Field(() => ExamStatus)
  @IsEnum(ExamStatus)
  status: ExamStatus;

  @Column({ default: 0 })
  @Field(() => Number, { defaultValue: 0 })
  order: number;
}
