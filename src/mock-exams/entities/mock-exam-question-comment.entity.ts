import { MockExamQuestion } from './mock-exam-question.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@InputType('MockExamQuestionCommentInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class MockExamQuestionComment extends CoreEntity {
  @Column({ default: '' })
  @Field(() => String)
  content: string;
  @ManyToOne(
    () => MockExamQuestion,
    (mockExamQuestion) => mockExamQuestion.mockExamQuestionComment,
  )
  @Field(() => MockExamQuestion)
  question: MockExamQuestion;

  @ManyToOne(() => User, (user) => user.mockExamQuestionComment, {
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  user: User;
}
