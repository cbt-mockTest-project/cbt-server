import { User } from 'src/users/entities/user.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { QuestionCardCategory } from './question-card-category';

@InputType('QuestionCardInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class QuestionCard extends CoreEntity {
  @Column()
  @Field(() => String)
  question: string;

  @Column()
  @Field(() => String)
  solution: string;

  @Field(() => QuestionCardCategory)
  @ManyToOne(
    () => QuestionCardCategory,
    (questionCardCategory) => questionCardCategory.questionCard,
  )
  category: QuestionCardCategory;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.questionCards)
  user: User;
}
