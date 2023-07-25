import { CoreEntity } from 'src/common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { QuestionCard } from './question-card.entity';
import { User } from 'src/users/entities/user.entity';

@InputType('QuestionCardCategoryInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class QuestionCardCategory extends CoreEntity {
  @Field(() => QuestionCard)
  @OneToMany(() => QuestionCard, (questionCard) => questionCard.category)
  questionCard: QuestionCard[];

  @Column()
  @Field(() => String)
  name: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.questionCardCategorys, {
    onDelete: 'CASCADE',
  })
  user: User;
}
