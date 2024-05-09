import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

export enum RevenueRequestFormStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

registerEnumType(RevenueRequestFormStatus, {
  name: 'RevenueRequestFormStatus',
});

@InputType('RevenueRequestFormInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class RevenueRequestForm extends CoreEntity {
  @OneToOne(() => MockExamCategory, (category) => category.revenueRequestForm)
  @Field(() => MockExamCategory)
  @JoinColumn()
  category: MockExamCategory;

  @Field(() => RevenueRequestFormStatus)
  @Column({
    type: 'enum',
    enum: RevenueRequestFormStatus,
    default: RevenueRequestFormStatus.PENDING,
  })
  status: RevenueRequestFormStatus;

  @Field(() => String, { nullable: true, defaultValue: '' })
  @Column({ default: '', nullable: true })
  reason?: string;
}
