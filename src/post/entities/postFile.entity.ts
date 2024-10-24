import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Post } from './post.entity';

@InputType('PostFileInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class PostFile extends CoreEntity {
  @Column()
  @Field(() => String, { defaultValue: '' })
  name: string;

  @Column()
  @Field(() => String, { defaultValue: '' })
  url: string;

  @Column()
  @Field(() => String, { defaultValue: '' })
  format: string;

  @ManyToOne(() => User, (user) => user.postFile, { onDelete: 'CASCADE' })
  @Field(() => User)
  user: User;

  @OneToOne(() => Post, (post) => post.file, { onDelete: 'CASCADE' })
  @Field(() => Post, { nullable: true })
  post?: Post;
}
