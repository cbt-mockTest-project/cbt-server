import { PostComment } from './postComment.entity';
import { User } from './../../users/entities/user.entity';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { IsEnum } from 'class-validator';
import { PostLike } from './postLike.entity';
import { PostData } from './postData.entity';

export enum PostCategory {
  FREE = 'FREE', // 자유
  REVIEW = 'REVIEW', // 시험후기
  RECOVERY = 'RECOVERY', // 복원
  NOTICE = 'NOTICE', //공지
  CHECKIN = 'CHECKIN', //출석체크
  SUGGENSTION = 'SUGGENSTION', //건의사항
  DATA = 'DATA', //자료실
}

registerEnumType(PostCategory, { name: 'PostCategory' });
@InputType('PostInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Post extends CoreEntity {
  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  content: string;

  @Column({
    type: 'enum',
    enum: PostCategory,
    default: PostCategory.FREE,
  })
  @Field(() => PostCategory)
  @IsEnum(PostCategory)
  category: PostCategory;

  @OneToMany(() => PostComment, (postComment) => postComment.post)
  @Field(() => [PostComment])
  comment: PostComment[];

  @OneToMany(() => PostLike, (postLike) => postLike.post)
  @Field(() => [PostLike])
  like: PostLike[];

  @ManyToOne(() => PostData, (postData) => postData.post, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @Field(() => PostData, { nullable: true })
  data: PostData;

  @ManyToOne(() => User, (user) => user.post, {
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  user: User;

  @Column({ default: 0 })
  @Field(() => Number, { defaultValue: 0 })
  view: number;

  @Field(() => Boolean, { defaultValue: false })
  likeState: boolean;

  @Column({ default: 0 })
  @Field(() => Number, { defaultValue: 0 })
  priority: number;

  @Column({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  isHidden: boolean;

  @Column({ default: 0 })
  @Field(() => Number, { defaultValue: 0 })
  likesCount?: number;

  @Field(() => Number, { defaultValue: 0 })
  commentsCount?: number;

  @Field(() => Boolean, { defaultValue: false })
  commentLikeState: boolean;

  @Field(() => Number, { defaultValue: 0 })
  commentLikesCount?: number;
}
