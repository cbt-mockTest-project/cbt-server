import { ExamCoAuthor } from './../../exam-co-author/entities/exam-co-author.entity';
import { User } from 'src/users/entities/user.entity';
import { MockExam } from './mock-exam.entity';
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
import Joi from 'joi';

export enum MockExamCategoryTypes {
  written = 'written',
  practical = 'practical',
}

registerEnumType(MockExamCategoryTypes, { name: 'MockExamCategoryTypes' });
@InputType('MockExamCategoryInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class MockExamCategory extends CoreEntity {
  @Column({ unique: true })
  @Field(() => String)
  name: string;

  @Field(() => [MockExam])
  @OneToMany(() => MockExam, (mockExam) => mockExam.mockExamCategory)
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
    type: 'boolean',
    default: true,
  })
  @Field(() => Boolean, { defaultValue: true })
  approved: boolean;

  @ManyToOne(() => User, (user) => user.mockExamCategory, {
    onDelete: 'SET NULL',
  })
  @Field(() => User)
  user: User;

  @Field(() => [ExamCoAuthor], { nullable: true })
  @OneToMany(() => ExamCoAuthor, (examCoAuthor) => examCoAuthor.examCategory, {
    onDelete: 'SET NULL',
  })
  examCoAuthor: ExamCoAuthor[];

  @ManyToMany(() => Role, (role) => role.mockExamCategories)
  @JoinTable({ name: 'ExamCategoryRole' })
  @Field(() => [Role])
  roles: Role[];

  @Column({ default: 0 })
  @Field(() => Number)
  order: number;
}

@Entity()
export class ExamCategoryRole extends CoreEntity {
  @ManyToOne(() => Role, (role) => role.mockExamCategories)
  role: Role;

  @ManyToOne(() => MockExamCategory, (category) => category.roles)
  mockExamCategory: MockExamCategory;
}
