import { MockExamQuestion } from './mock-exam-question.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Entity, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@InputType('MockExamQuestionCommentLikeInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class MockExamQuestionCommentLike extends CoreEntity {
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
