import { ExamCoAuthor } from '../../exam-co-author/entities/exam-co-author.entity';
import { User } from 'src/users/entities/user.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { MockExamQuestion } from './mock-exam-question.entity';
import { MockExamQuestionState } from './mock-exam-question-state.entity';
import { IsEnum } from 'class-validator';
import { MockExamHistory } from './mock-exam-history';
import { ExamViewer } from 'src/exam-viewer/entities/exam-viewer.entity';
import { MockExamBookmark } from 'src/exam-bookmark/entities/mock-exam-bookmark.entity';
import { ExamLike } from 'src/exam-like/entities/exam-like.entity';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';
import { ExamSource, ExamStatus } from 'src/enums/enum';
import { Quiz } from 'src/quiz/entities/quiz.entity';

registerEnumType(ExamSource, { name: 'ExamSource' });
registerEnumType(ExamStatus, { name: 'ExamStatus' });

@InputType('MockExamInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class MockExam extends CoreEntity {
  @Column({ default: () => 'uuid_generate_v4()', unique: true })
  @Field(() => String)
  uuid: string;

  @Column({ unique: true })
  @Field(() => String)
  title: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  slug: string;

  @Column({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  approved: boolean;

  @Column({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  isPremium: boolean;

  @Field(() => [MockExamCategory])
  @ManyToMany(
    () => MockExamCategory,
    (mockExamCategory) => mockExamCategory.mockExam,
    {
      onDelete: 'CASCADE',
    },
  )
  mockExamCategory: MockExamCategory[];

  @Field(() => [MockExamQuestion])
  @OneToMany(
    () => MockExamQuestion,
    (mockExamQuestion) => mockExamQuestion.mockExam,
    {
      onDelete: 'SET NULL',
      cascade: true,
    },
  )
  mockExamQuestion: MockExamQuestion[];

  @Field(() => [Quiz])
  @OneToMany(() => Quiz, (quiz) => quiz.category)
  quiz: Quiz[];

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

  @Field(() => [ExamViewer], { nullable: true })
  @OneToMany(() => ExamViewer, (examViewer) => examViewer.exam, {
    onDelete: 'SET NULL',
  })
  examViewer: ExamViewer[];

  @ManyToOne(() => User, (user) => user.mockExam, {
    onDelete: 'SET NULL',
  })
  @Field(() => User)
  user: User;

  @OneToMany(() => MockExamBookmark, (bookmark) => bookmark.exam)
  @Field(() => [MockExamBookmark])
  examBookmarks: MockExamBookmark[];

  @OneToMany(() => ExamLike, (like) => like.exam)
  @Field(() => [ExamLike])
  examLikes: ExamLike[];

  @Column({ type: 'enum', enum: ExamStatus, default: ExamStatus.UNSET })
  @Field(() => ExamStatus)
  @IsEnum(ExamStatus)
  status: ExamStatus;

  @Column({ type: 'enum', enum: ExamSource, default: ExamSource.MOUD_CBT })
  @Field(() => ExamSource)
  @IsEnum(ExamSource)
  source: ExamSource;

  @Column({ default: 0 })
  @Field(() => Number, { defaultValue: 0 })
  order: number;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  isBookmarked?: boolean = false;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  isLiked?: boolean = false;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  isPrivate?: boolean = false;

  @Column({ type: 'json', default: [] })
  @Field(() => [String], { defaultValue: [] })
  questionOrderIds: string[];

  @Column({ type: 'json', default: [] })
  @Field(() => [Number], { defaultValue: [] })
  accesibleRoleIds: number[];
}
