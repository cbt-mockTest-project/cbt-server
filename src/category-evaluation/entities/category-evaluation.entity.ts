import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@InputType('CategoryEvaluationInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class CategoryEvaluation extends CoreEntity {
  @Column()
  @Field(() => Number, { nullable: true })
  score: number;

  @Column()
  @Field(() => String, { nullable: true, defaultValue: '' })
  feedback?: string;

  @Column()
  @Field(() => Boolean, { nullable: true, defaultValue: false })
  isSecret: boolean;

  @ManyToOne(
    () => MockExamCategory,
    (category) => category.categoryEvaluations,
    {
      onDelete: 'CASCADE',
    },
  )
  @Field(() => MockExamCategory)
  category: MockExamCategory;

  @ManyToOne(() => User, (user) => user.categoryEvaluations, {
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  user: User;
}
