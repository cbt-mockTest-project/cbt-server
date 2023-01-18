import { User } from './../../users/entities/user.entity';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IsEnum } from 'class-validator';

export enum PostCategory {
  FREE = 'FREE',
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

  @ManyToOne(() => User, (user) => user.post, {
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  user: User;
}
