import { MockExamHistory } from './../../mock-exams/entities/mock-exam-history';
import { QuestionCard } from './../../question-card/entities/question-card.entity';
import { MockExamCategory } from './../../mock-exams/entities/mock-exam-category.entity';
import { PostComment } from './../../post/entities/postComment.entity';
import { Post } from './../../post/entities/post.entity';
import { MockExamQuestionComment } from './../../mock-exams/entities/mock-exam-question-comment.entity';
import { CoreEntity } from './../../common/entities/core.entity';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { InternalServerErrorException } from '@nestjs/common';
import { MockExamQuestionState } from 'src/mock-exams/entities/mock-exam-question-state.entity';
import { MockExamQuestionFeedback } from 'src/mock-exams/entities/mock-exam-question-feedback.entity';
import { Feedback } from './feedback.entity';
import { MockExamQuestionCommentLike } from 'src/mock-exams/entities/mock-exam-question-comment-like.entity';
import { Notice } from './notice.entity';
import { MockExamQuestionBookmark } from 'src/mock-exams/entities/mock-exam-question-bookmark.entity';
import { Visit } from 'src/visit/entities/visit.entity';
import { MockExam } from 'src/mock-exams/entities/mock-exam.entity';
import { MockExamQuestion } from 'src/mock-exams/entities/mock-exam-question.entity';
import { QuestionCardCategory } from 'src/question-card/entities/question-card-category';

export enum UserRole {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
}

export enum LoginType {
  NAVER = 'NAVER',
  KAKAO = 'KAKAO',
  GOOGLE = 'GOOGLE',
  EMAIL = 'EMAIL',
}

registerEnumType(UserRole, { name: 'UserRole' });
registerEnumType(LoginType, { name: 'LoginType' });

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column({ unique: true })
  @Field(() => String)
  @IsEmail()
  email: string;

  @Column({ unique: true })
  @Field(() => String)
  nickname: string;

  @Column({ select: false, nullable: true })
  @Field(() => String)
  @IsString()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    nullable: true,
    default: null,
  })
  @Field(() => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @Column({
    type: 'enum',
    enum: LoginType,
    default: LoginType.EMAIL,
  })
  @Field(() => LoginType)
  @IsEnum(LoginType)
  LoginType: LoginType;

  @OneToMany(
    () => MockExamQuestionState,
    (mockExamQuestionState) => mockExamQuestionState.user,
  )
  @Field(() => [MockExamQuestionState])
  mockExamQuestionState: MockExamQuestionState[];

  @OneToMany(() => MockExam, (mockExam) => mockExam.user)
  @Field(() => [MockExam])
  mockExam: MockExam[];

  @OneToMany(
    () => MockExamCategory,
    (mockExamCategory) => mockExamCategory.user,
  )
  @Field(() => [MockExamCategory])
  mockExamCategory: MockExamCategory[];

  @OneToMany(
    () => MockExamQuestionComment,
    (mockExamQuestionComment) => mockExamQuestionComment.user,
  )
  @Field(() => [MockExamQuestionComment])
  mockExamQuestionComment: MockExamQuestionComment[];

  @OneToMany(() => PostComment, (postComment) => postComment.user)
  @Field(() => [PostComment])
  postComment: PostComment[];

  @OneToMany(
    () => MockExamQuestionCommentLike,
    (mockExamQuestionCommentLike) => mockExamQuestionCommentLike.user,
  )
  @Field(() => [MockExamQuestionCommentLike])
  mockExamQuestionCommentLike: MockExamQuestionCommentLike[];

  @OneToMany(
    () => MockExamQuestionFeedback,
    (questionFeedback) => questionFeedback.user,
  )
  @Field(() => [MockExamQuestionFeedback])
  questionFeedback: MockExamQuestionFeedback[];

  @OneToMany(() => Feedback, (feedback) => feedback.user)
  @Field(() => [Feedback])
  feedback: Feedback[];

  @OneToMany(() => Visit, (visit) => visit.user)
  @Field(() => Visit)
  visit: Visit[];

  @OneToMany(() => Notice, (notice) => notice.user)
  @Field(() => [Notice], { nullable: true })
  notice: Notice[];

  @OneToMany(() => Post, (post) => post.user)
  @Field(() => [Post], { nullable: true })
  post: Post[];

  @DeleteDateColumn()
  @Field(() => Date)
  deletedAt?: Date;

  @Field(() => [MockExamQuestionBookmark])
  @OneToMany(
    () => MockExamQuestionBookmark,
    (mockExamQuestionBookmark) => mockExamQuestionBookmark.user,
    {
      onDelete: 'SET NULL',
    },
  )
  mockExamQuestionBookmark: MockExamQuestionBookmark[];

  @Field(() => [MockExamQuestion])
  @OneToMany(
    () => MockExamQuestion,
    (mockExamQuestionMockExamQuestion) => mockExamQuestionMockExamQuestion.user,
  )
  mockExamQuestion: MockExamQuestionBookmark[];

  @Field(() => [MockExamHistory])
  @OneToMany(() => MockExamHistory, (mockExamHistory) => mockExamHistory.user)
  mockExamHistory: MockExamHistory[];

  @Field(() => [QuestionCard])
  @OneToMany(() => QuestionCard, (questionCard) => questionCard.user)
  questionCards: QuestionCard[];

  @Field(() => [QuestionCardCategory])
  @OneToMany(
    () => QuestionCardCategory,
    (questionCardCategory) => questionCardCategory.user,
  )
  questionCardCategorys: QuestionCard[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch {
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(hashedPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(hashedPassword, this.password);
      return ok;
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
