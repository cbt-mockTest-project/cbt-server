import { ExamCoAuthor } from './../../exam-co-author/entities/exam-co-author.entity';
import { User } from 'src/users/entities/user.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { IsEnum } from 'class-validator';
import { Role } from 'src/users/entities/role.entity';
import { Partner } from 'src/partners/entities/partners.entity';
import { ExamViewer } from 'src/exam-viewer/entities/exam-viewer.entity';
import { ExamCategoryBookmark } from 'src/exam-category-bookmark/entities/exam-category-bookmark';
import { ExamCategoryInvitation } from 'src/exam-category-invitation/entities/exam-category-invitation.entity';
import { MockExam } from 'src/exam/entities/mock-exam.entity';
import { ExamSource } from 'src/enums/enum';
import { Seller } from 'src/seller/entities/seller.entity';
import { CategoryEvaluation } from 'src/category-evaluation/entities/category-evaluation.entity';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { CategoryInvitationLink } from 'src/category-invitation-link/entities/category-invitation-link.entity';
import { Item } from 'src/item/entities/item.entity';

export enum ExamType {
  OBJECTIVE = 'OBJECTIVE',
  SUBJECTIVE = 'SUBJECTIVE',
}

export enum MockExamCategoryTypes {
  written = 'written',
  practical = 'practical',
}

registerEnumType(MockExamCategoryTypes, { name: 'MockExamCategoryTypes' });
registerEnumType(ExamType, { name: 'ExamType' });
@InputType('MockExamCategoryInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class MockExamCategory extends CoreEntity {
  @Column({ unique: true })
  @Field(() => String)
  name: string;

  @Column({ unique: true })
  @Field(() => String)
  urlSlug: string;

  @Column({ default: '' })
  @Field(() => String, { defaultValue: '' })
  description?: string;

  @Field(() => [MockExam])
  @ManyToMany(() => MockExam, (mockExam) => mockExam.mockExamCategory)
  @JoinTable({
    name: 'category_and_exam',
    joinColumn: {
      name: 'categoryId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'examId',
      referencedColumnName: 'id',
    },
  })
  mockExam: MockExam[];

  @Column({
    type: 'enum',
    enum: MockExamCategoryTypes,
    default: MockExamCategoryTypes.practical,
  })
  @Field(() => MockExamCategoryTypes)
  @IsEnum(MockExamCategoryTypes)
  type: MockExamCategoryTypes;

  @Column({
    type: 'enum',
    enum: ExamType,
    default: ExamType.SUBJECTIVE,
  })
  @Field(() => ExamType)
  @IsEnum(ExamType)
  examType: ExamType;

  @Column({
    type: 'boolean',
    default: true,
  })
  @Field(() => Boolean, { defaultValue: true })
  approved: boolean;

  @ManyToOne(() => User, (user) => user.mockExamCategory, {
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  user: User;

  @OneToMany(
    () => CategoryEvaluation,
    (categoryEvaluation) => categoryEvaluation.category,
  )
  @Field(() => [CategoryEvaluation], { defaultValue: [], nullable: true })
  categoryEvaluations: CategoryEvaluation[];

  @Field(() => [Quiz])
  @OneToMany(() => Quiz, (quiz) => quiz.category)
  quiz: Quiz[];

  @ManyToOne(() => Partner, (partner) => partner.examCategory, {
    onDelete: 'SET NULL',
  })
  @Field(() => Partner, { nullable: true })
  partner: Partner;

  @ManyToOne(() => Seller, (seller) => seller.examCategories, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @Field(() => Seller, { nullable: true })
  seller?: Seller;

  @Field(() => [ExamCoAuthor], { nullable: true })
  @OneToMany(() => ExamCoAuthor, (examCoAuthor) => examCoAuthor.examCategory, {
    onDelete: 'SET NULL',
  })
  examCoAuthor: ExamCoAuthor[];

  @OneToMany(() => ExamCategoryBookmark, (bookmark) => bookmark.category)
  @Field(() => [ExamCategoryBookmark])
  examCategoryBookmarks: ExamCategoryBookmark[];

  @OneToMany(
    () => ExamCategoryInvitation,
    (examCategoryInvitations) => examCategoryInvitations.category,
  )
  @Field(() => [ExamCategoryInvitation])
  examCategoryInvitations: ExamCategoryInvitation[];

  @OneToMany(
    () => CategoryInvitationLink,
    (categoryInvitationLinks) => categoryInvitationLinks.category,
  )
  @Field(() => [CategoryInvitationLink])
  categoryInvitationLinks: CategoryInvitationLink[];

  @Field(() => [ExamViewer], { nullable: true })
  @OneToMany(() => ExamViewer, (examViewer) => examViewer.examCategory, {
    onDelete: 'SET NULL',
  })
  examViewer: ExamViewer[];

  @OneToMany(() => Item, (item) => item.category)
  @Field(() => [Item])
  items: Item[];

  @ManyToMany(() => Role, (role) => role.mockExamCategories)
  @JoinTable({ name: 'ExamCategoryRole' })
  @Field(() => [Role])
  roles: Role[];

  @Column({ default: 0 })
  @Field(() => Number)
  order: number;

  @Column({ type: 'enum', enum: ExamSource, default: ExamSource.MOUD_CBT })
  @Field(() => ExamSource)
  @IsEnum(ExamSource)
  source: ExamSource;

  @Column({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  isPublic: boolean;

  @Column({ type: 'json', default: [] })
  @Field(() => [Number], { defaultValue: [] })
  examOrderIds: number[];

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  hasAccess?: boolean = false;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  isBookmarked?: boolean = false;
}

@Entity()
export class ExamCategoryRole extends CoreEntity {
  @ManyToOne(() => Role, (role) => role.mockExamCategories)
  role: Role;

  @ManyToOne(() => MockExamCategory, (category) => category.roles)
  mockExamCategory: MockExamCategory;
}
