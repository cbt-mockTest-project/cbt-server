import { InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { MockExam } from 'src/mock-exams/entities/mock-exam.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, ManyToOne } from 'typeorm';

@InputType('MockExamBookmarkInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class MockExamBookmark extends CoreEntity {
  @ManyToOne(() => User, (user) => user.examBookmarks)
  user: User;

  @ManyToOne(() => MockExam, (exam) => exam.examBookmarks)
  exam: MockExam;
}
