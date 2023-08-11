import { User } from 'src/users/entities/user.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, ManyToOne } from 'typeorm';
import { MockExam } from './mock-exam.entity';

@InputType('MockExamHistoryInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class MockExamHistory extends CoreEntity {
  @Field(() => MockExam)
  @ManyToOne(() => MockExam, (mockExam) => mockExam.history)
  exam: MockExam;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.mockExamHistory, {
    onDelete: 'CASCADE',
  })
  user: User;
}
