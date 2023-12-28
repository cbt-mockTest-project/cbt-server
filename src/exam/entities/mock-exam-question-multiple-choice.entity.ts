import { MockExamQuestion } from './mock-exam-question.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToOne } from 'typeorm';

@InputType('MockExamQuestionMultipleChoiceOptionInputType', {
  isAbstract: true,
})
@ObjectType()
export class MockExamMultipleChoiceOption {
  @Field(() => String, { nullable: true })
  image?: string;
  @Field(() => String)
  content: string;
  @Field(() => Number)
  number: number;
}

@InputType('MockExamQuestionMultipleChoiceInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class MockExamQuestionMultipleChoice extends CoreEntity {
  @Column({ type: 'json', default: [] })
  @Field(() => [MockExamMultipleChoiceOption])
  options: MockExamMultipleChoiceOption[];

  @Column()
  @Field(() => Number)
  answer: number;

  @OneToOne(() => MockExamQuestion, (question) => question.multipleChoice, {
    onDelete: 'CASCADE',
  })
  @Field(() => MockExamQuestion)
  question: MockExamQuestion;
}
