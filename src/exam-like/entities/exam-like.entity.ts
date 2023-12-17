import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { MockExam } from 'src/mock-exams/entities/mock-exam.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@InputType('ExamLikeInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class ExamLike {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  examId: number;

  @ManyToOne(() => User, (user) => user.examLikes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  @Field(() => User)
  user: User;

  @ManyToOne(() => MockExam, (exam) => exam.examLikes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'examId' })
  @Field(() => MockExam)
  exam: MockExam;
}
