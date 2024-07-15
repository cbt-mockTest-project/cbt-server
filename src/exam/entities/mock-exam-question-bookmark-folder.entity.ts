import { CoreEntity } from '../../common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { MockExamQuestionBookmark } from './mock-exam-question-bookmark.entity';
import { User } from 'src/users/entities/user.entity';

@InputType('MockExamQuestionBookmarkFolderInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class MockExamQuestionBookmarkFolder extends CoreEntity {
  @Field(() => String)
  @Column()
  name: string;

  @Field(() => [MockExamQuestionBookmark])
  @OneToMany(
    () => MockExamQuestionBookmark,
    (mockExamQuestionBookmark) => mockExamQuestionBookmark.question,
  )
  questionBookmark: MockExamQuestionBookmark[];

  @ManyToOne(() => User, (user) => user.mockExamQuestionBookmarkFolder, {
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  user: User;
}
