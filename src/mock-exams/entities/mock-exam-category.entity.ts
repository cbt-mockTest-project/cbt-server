import { User } from 'src/users/entities/user.entity';
import { MockExam } from './mock-exam.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { IsEnum } from 'class-validator';

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
}
