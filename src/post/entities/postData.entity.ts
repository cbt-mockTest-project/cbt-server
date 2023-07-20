import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Post } from './post.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import { PostFile } from './postFile.entity';

@InputType('PostDataInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class PostData extends CoreEntity {
  @Column({ default: '' })
  @Field(() => String)
  price: string;

  @ManyToOne(() => Post, (post) => post.data, { onDelete: 'CASCADE' })
  @Field(() => Post)
  post: Post;

  @OneToMany(() => PostFile, (postFile) => postFile.postData)
  @Field(() => [PostFile])
  postFile: PostFile[];
}
