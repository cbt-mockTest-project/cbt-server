import { ExamCoAuthor } from './../../exam-co-author/entities/exam-co-author.entity';
import { MockExamHistory } from '../../exam/entities/mock-exam-history';
import { QuestionCard } from './../../question-card/entities/question-card.entity';
import { PostComment } from './../../post/entities/postComment.entity';
import { Post } from './../../post/entities/post.entity';
import { MockExamQuestionComment } from '../../exam/entities/mock-exam-question-comment.entity';
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
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { InternalServerErrorException } from '@nestjs/common';
import { MockExamQuestionState } from 'src/exam/entities/mock-exam-question-state.entity';
import { MockExamQuestionFeedback } from 'src/exam/entities/mock-exam-question-feedback.entity';
import { Feedback } from './feedback.entity';
import { MockExamQuestionCommentLike } from 'src/exam/entities/mock-exam-question-comment-like.entity';
import { Notice } from './notice.entity';
import { MockExamQuestionBookmark } from 'src/exam/entities/mock-exam-question-bookmark.entity';
import { Visit } from 'src/visit/entities/visit.entity';
import { MockExam } from 'src/exam/entities/mock-exam.entity';
import { MockExamQuestion } from 'src/exam/entities/mock-exam-question.entity';
import { QuestionCardCategory } from 'src/question-card/entities/question-card-category';
import { MockExamQuestionFeedbackRecommendation } from 'src/exam/entities/mock-exam-question-feedback-recommendation.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { UserAndRole } from './userAndRole.entity';
import { Attendance } from 'src/attendance/entities/attendance.entity';
import { Todo } from 'src/todo/entities/Todo.entity';
import { PostData } from 'src/post/entities/postData.entity';
import { PostFile } from 'src/post/entities/postFile.entity';
import { ExamViewer } from 'src/exam-viewer/entities/exam-viewer.entity';
import { DiscountCode } from 'src/discount-code/discount-code.entity';
import { MockExamBookmark } from 'src/exam-bookmark/entities/mock-exam-bookmark.entity';
import { ExamLike } from 'src/exam-like/entities/exam-like.entity';
import { ExamCategoryBookmark } from 'src/exam-category-bookmark/entities/exam-category-bookmark';
import { ExamCategoryInvitation } from 'src/exam-category-invitation/entities/exam-category-invitation.entity';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';
import { Seller } from 'src/seller/entities/seller.entity';
import { CategoryEvaluation } from 'src/category-evaluation/entities/category-evaluation.entity';

export enum UserRole {
  CLIENT = 'CLIENT',
  CLIENT_BASIC = 'CLIENT_BASIC',
  CLIENT_SAFE_PREMIUM = 'CLIENT_SAFE_PREMIUM',
  ADMIN = 'ADMIN',
  SELLER = 'SELLER',
  PARTNER = 'PARTNER',
  PAYMENT_TEST = 'PAYMENT_TEST',
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

  @Column({ default: '' })
  @Field(() => String, { defaultValue: '' })
  profileImg: string;

  @Column({ unique: true })
  @Field(() => String)
  nickname: string;

  @Column({ default: false })
  @Field(() => Boolean)
  isAllowAdblock: boolean;

  @Column({ default: false })
  @Field(() => Boolean)
  usedFreeTrial: boolean;

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

  @Field(() => String, { defaultValue: '' })
  @Column({ default: '' })
  lastLogInIp: string;

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

  @OneToMany(
    () => CategoryEvaluation,
    (categoryEvaluation) => categoryEvaluation.user,
  )
  @Field(() => [CategoryEvaluation])
  categoryEvaluations: CategoryEvaluation[];

  @OneToMany(() => PostComment, (postComment) => postComment.user)
  @Field(() => [PostComment])
  postComment: PostComment[];

  @OneToMany(() => PostData, (postData) => postData.user)
  @Field(() => [PostData])
  postData: PostData[];

  @OneToMany(() => PostFile, (postFile) => postFile.user)
  @Field(() => [PostFile])
  postFile: PostFile[];

  @OneToMany(() => MockExamBookmark, (bookmark) => bookmark.user)
  @Field(() => [MockExamBookmark])
  examBookmarks: MockExamBookmark[];

  @OneToMany(
    () => ExamCategoryInvitation,
    (examCategoryInvitations) => examCategoryInvitations.user,
  )
  @Field(() => [ExamCategoryInvitation])
  examCategoryInvitations: ExamCategoryInvitation[];

  @OneToMany(() => ExamCategoryBookmark, (bookmark) => bookmark.user)
  @Field(() => [ExamCategoryBookmark])
  examCategoryBookmarks: ExamCategoryBookmark[];

  @OneToMany(() => ExamLike, (like) => like.user)
  @Field(() => [ExamLike])
  examLikes: ExamLike[];

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
  @Field(() => [Visit])
  visit: Visit[];

  @OneToMany(() => Notice, (notice) => notice.user)
  @Field(() => [Notice], { nullable: true })
  notice: Notice[];

  @OneToMany(() => Payment, (payment) => payment.user)
  @Field(() => [Payment])
  payments: Payment[];

  @OneToMany(() => Post, (post) => post.user)
  @Field(() => [Post], { nullable: true })
  post: Post[];

  @OneToMany(() => ExamCoAuthor, (examCoAuthor) => examCoAuthor.user)
  @Field(() => [ExamCoAuthor], { nullable: true })
  examCoAuthor: ExamCoAuthor[];

  @OneToMany(() => DiscountCode, (discountCode) => discountCode.user)
  @Field(() => [DiscountCode], { nullable: true })
  discountCode: DiscountCode[];

  @OneToMany(() => ExamViewer, (examViewer) => examViewer.user)
  @Field(() => [ExamViewer], { nullable: true })
  examViewer: ExamViewer[];

  @OneToMany(() => Attendance, (attendance) => attendance.user)
  @Field(() => [Attendance], { nullable: true })
  attendances: Attendance[];

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

  @Field(() => [Todo])
  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];

  @Field(() => [QuestionCard])
  @OneToMany(() => QuestionCard, (questionCard) => questionCard.user)
  questionCards: QuestionCard[];

  @Field(() => [QuestionCardCategory])
  @OneToMany(
    () => QuestionCardCategory,
    (questionCardCategory) => questionCardCategory.user,
  )
  questionCardCategorys: QuestionCard[];

  @Field(() => [MockExamQuestionFeedbackRecommendation])
  @OneToMany(
    () => MockExamQuestionFeedbackRecommendation,
    (feedbackRecommendation) => feedbackRecommendation.user,
  )
  feedbackRecommendation: MockExamQuestionFeedbackRecommendation[];

  @Field(() => [UserAndRole])
  @OneToMany(() => UserAndRole, (userRole) => userRole.user)
  userRoles: UserAndRole[];

  @OneToOne(() => Seller, (seller) => seller.user, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  @Field(() => Seller, { nullable: true })
  seller: Seller;

  @Column({ default: 0 })
  @Field(() => Number, { defaultValue: 0, nullable: true })
  solvedProblemCount?: number;

  @Column({ default: '' })
  @Field(() => String, { defaultValue: '' })
  recentlyStudiedCategory: string;

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
