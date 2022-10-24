import { CoreEntity } from './../../common/entities/core.entity';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { InternalServerErrorException } from '@nestjs/common';
import { MockExamQuestionState } from 'src/mock-exams/entities/mock-exam-question-state.entity';

export enum UserRole {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
}

registerEnumType(UserRole, { name: 'UserRole' });

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

  @Column({ select: false })
  @Field(() => String)
  @IsString()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  @Field(() => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @OneToMany(
    () => MockExamQuestionState,
    (mockExamQuestionState) => mockExamQuestionState.mockExamQuestion,
  )
  @Field(() => [MockExamQuestionState])
  mockExamQuestionState: MockExamQuestionState[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (e) {
        console.log(e);
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(hashedPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(hashedPassword, this.password);
      return ok;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
