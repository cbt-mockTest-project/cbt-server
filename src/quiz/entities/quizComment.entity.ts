import { Quiz } from './quiz.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { QuizCommentLike } from './quizCommentLike.entity';

@InputType('QuizCommentInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class QuizComment extends CoreEntity {
  @Column({ default: '' })
  @Field(() => String)
  content: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.comment, { onDelete: 'CASCADE' })
  @Field(() => Quiz)
  quiz: Quiz;

  @ManyToOne(() => User, (user) => user.quizComment, {
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  user: User;

  @OneToMany(
    () => QuizCommentLike,
    (quizCommentLike) => quizCommentLike.comment,
  )
  @Field(() => [QuizCommentLike])
  commentLike: QuizCommentLike[];

  @Field(() => Boolean, { defaultValue: false })
  likeState: boolean;

  @Field(() => Number, { defaultValue: 0 })
  likesCount?: number;
}
