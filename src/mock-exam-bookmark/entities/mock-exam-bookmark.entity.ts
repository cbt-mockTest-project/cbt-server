import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { MockExam } from 'src/mock-exams/entities/mock-exam.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@InputType('MockExamBookmarkInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class MockExamBookmark {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  examId: number;

  @ManyToOne(() => User, (user) => user.examBookmarks)
  @JoinColumn({ name: 'userId' })
  @Field(() => User)
  user: User;

  @ManyToOne(() => MockExam, (exam) => exam.examBookmarks)
  @JoinColumn({ name: 'examId' })
  @Field(() => MockExam)
  exam: MockExam;
}
