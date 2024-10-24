import { PostComment } from './postComment.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Entity, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@InputType('PostCommentLikeInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class PostCommentLike extends CoreEntity {
  @ManyToOne(() => PostComment, (postComment) => postComment.likes, {
    onDelete: 'CASCADE',
  })
  @Field(() => PostComment)
  comment: PostComment;

  @ManyToOne(() => User, (user) => user.mockExamQuestionComment, {
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  user: User;
}
