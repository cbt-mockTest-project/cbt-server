import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { MockExamCategory } from 'src/mock-exams/entities/mock-exam-category.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@InputType('PartnerInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Partner extends CoreEntity {
  @Column()
  @Field(() => String)
  name: string;

  @OneToMany(() => MockExamCategory, (examCategory) => examCategory.partner)
  @Field(() => [MockExamCategory])
  examCategory: MockExamCategory[];
}
