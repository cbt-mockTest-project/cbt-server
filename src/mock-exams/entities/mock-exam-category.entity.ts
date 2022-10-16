import { MockExam } from './mock-exam.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';

@InputType('MockExamCategoryInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class MockExamCategory extends CoreEntity {
  @Column()
  @Field(() => String)
  name: string;

  @Field(() => [MockExam])
  @OneToMany(() => MockExam, (mockExam) => mockExam.mockExamCategory)
  mockExam: MockExam[];
}
