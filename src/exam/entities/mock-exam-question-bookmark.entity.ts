import { MockExamQuestion } from './mock-exam-question.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Entity, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { MockExamQuestionBookmarkFolder } from './mock-exam-question-bookmark-folder.entity';

@InputType('MockExamQuestionBookmarkInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class MockExamQuestionBookmark extends CoreEntity {
  @ManyToOne(
    () => MockExamQuestion,
    (mockExamQuestion) => mockExamQuestion.state,
    { onDelete: 'CASCADE' },
  )
  @Field(() => MockExamQuestion)
  question: MockExamQuestion;

  @ManyToOne(
    () => MockExamQuestionBookmarkFolder,
    (mockExamQuestionBookmarkFolder) =>
      mockExamQuestionBookmarkFolder.questionBookmark,
    { onDelete: 'SET NULL', nullable: true },
  )
  @Field(() => MockExamQuestionBookmarkFolder, { nullable: true })
  bookmarkFolder: MockExamQuestionBookmarkFolder;

  @ManyToOne(() => User, (user) => user.mockExamQuestionState, {
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  user: User;
}
