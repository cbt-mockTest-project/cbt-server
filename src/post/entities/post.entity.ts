import { PostComment } from './postComment.entity';
import { User } from './../../users/entities/user.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { PostLike } from './postLike.entity';
import { PostFile } from './postFile.entity';

export enum PostStatusEnum {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  PUBLISHED = 'PUBLISHED',
  REJECTED = 'REJECTED',
}

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

  @Column({ default: '' })
  @Field(() => String, { defaultValue: '' })
  keyword?: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  thumbnail?: string;

  @Column({ type: 'json', default: [] })
  @Field(() => [String], { defaultValue: [] })
  imageUrls?: string[];

  @Column({ default: 0 })
  @Field(() => Number, { defaultValue: 0 })
  price?: number;

  @OneToMany(() => PostComment, (postComment) => postComment.post)
  @Field(() => [PostComment])
  comments: PostComment[];

  @OneToMany(() => PostLike, (postLike) => postLike.post)
  @Field(() => [PostLike])
  likes: PostLike[];

  @JoinColumn()
  @OneToOne(() => PostFile, (postFile) => postFile.post)
  @Field(() => PostFile)
  file: PostFile;

  @ManyToOne(() => User, (user) => user.post, {
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  user: User;

  @Column({ default: 0 })
  @Field(() => Number, { defaultValue: 0 })
  view: number;

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

  @Field(() => Boolean, { defaultValue: false })
  likeState: boolean;
}
