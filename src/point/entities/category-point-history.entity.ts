import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, JoinColumn, JoinTable, ManyToOne, OneToOne } from 'typeorm';
import { PointTransaction } from './point-transaction.entity';

@InputType('CategoryPointHistoryInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class CategoryPointHistory extends CoreEntity {
  @ManyToOne(
    () => MockExamCategory,
    (category) => category.categoryPointHistories,
    {
      onDelete: 'CASCADE',
    },
  )
  @Field(() => MockExamCategory)
  category: MockExamCategory;

  @ManyToOne(() => User, (user) => user.categoryPointHistories, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @Field(() => User, { nullable: true })
  buyer: User;

  @OneToOne(
    () => PointTransaction,
    (pointTransaction) => pointTransaction.categoryPointHistory,
  )
  @Field(() => PointTransaction)
  @JoinColumn()
  pointTransaction: PointTransaction;
}
