import { CoreEntity } from '../../common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Entity, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Post } from './post.entity';

@InputType('PostLikeInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class PostLike extends CoreEntity {
  @ManyToOne(() => Post, (post) => post.likes, {
    onDelete: 'CASCADE',
  })
  @Field(() => Post)
  post: Post;

  @ManyToOne(() => User, (user) => user.mockExamQuestionComment, {
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  user: User;
}
