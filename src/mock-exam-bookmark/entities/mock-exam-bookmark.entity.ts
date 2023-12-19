import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { TimeStampedEntity } from 'src/common/entities/core.entity';
import { MockExam } from 'src/mock-exams/entities/mock-exam.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@InputType('MockExamBookmarkInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class MockExamBookmark extends TimeStampedEntity {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  examId: number;

  @ManyToOne(() => User, (user) => user.examBookmarks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  @Field(() => User)
  user: User;

  @ManyToOne(() => MockExam, (exam) => exam.examBookmarks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'examId' })
  @Field(() => MockExam)
  exam: MockExam;
}
