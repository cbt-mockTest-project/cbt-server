import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PostData } from './postData.entity';
import { User } from 'src/users/entities/user.entity';

@InputType('PostFile', { isAbstract: true })
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
  @Field(() => Number, { defaultValue: 0 })
  page: number;

  @ManyToOne(() => PostData, (postData) => postData.postFile, {
    onDelete: 'CASCADE',
  })
  @Field(() => PostData)
  postData: PostFile;

  @ManyToOne(() => User, (user) => user.postFile, { onDelete: 'CASCADE' })
  @Field(() => User)
  user: User;
}
