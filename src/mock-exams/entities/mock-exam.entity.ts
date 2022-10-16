import { MockExamCategory } from './mock-exam-category.entity';
import { CoreEntity } from './../../common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { MockExamQuestion } from './mock-exam-question.entity';

@InputType('MockExamInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class MockExam extends CoreEntity {
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
      onDelete: 'SET NULL', // category 삭제될시  mockExam's categoryId가 null
    },
  )
  mockExamQuestion: MockExamQuestion[];
}