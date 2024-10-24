import { Post } from './post.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { PostCommentLike } from './postCommentLike.entity';

@InputType('PostCommentInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class PostComment extends CoreEntity {
  @Column({ default: '' })
  @Field(() => String)
  content: string;

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  @Field(() => Post)
  post: Post;

  @ManyToOne(() => User, (user) => user.postComment, {
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  user: User;

  @OneToMany(
    () => PostCommentLike,
    (postCommentLike) => postCommentLike.comment,
  )
  @Field(() => [PostCommentLike])
  likes: PostCommentLike[];

  @Field(() => Boolean, { defaultValue: false })
  likeState: boolean;

  @Field(() => Number, { defaultValue: 0 })
  likesCount?: number;
}
