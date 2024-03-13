import { QuizComment } from './quizComment.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Entity, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@InputType('QuizCommentLikeInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class QuizCommentLike extends CoreEntity {
  @ManyToOne(() => QuizComment, (quizComment) => quizComment.commentLike, {
    onDelete: 'CASCADE',
  })
  @Field(() => QuizComment)
  comment: QuizComment;

  @ManyToOne(() => User, (user) => user.quizCommentLike, {
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  user: User;
}
