import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Post } from './post.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import { PostFile } from './postFile.entity';
import { User } from 'src/users/entities/user.entity';

@InputType('PostDataInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class PostData extends CoreEntity {
  @Column({ default: '' })
  @Field(() => String)
  price: string;

  @OneToMany(() => Post, (post) => post.data)
  @Field(() => [Post])
  post: Post[];

  @OneToMany(() => PostFile, (postFile) => postFile.postData)
  @Field(() => [PostFile])
  postFile: PostFile[];

  @ManyToOne(() => User, (user) => user.postData, { onDelete: 'CASCADE' })
  @Field(() => User)
  user: User;
}
