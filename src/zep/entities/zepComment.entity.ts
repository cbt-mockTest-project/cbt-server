import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ZepPost } from './zepPost.entity';
import { ZepUser } from './zepUser.entity';

@InputType('ZepCommentInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class ZepComment extends CoreEntity {
  @Column()
  @Field(() => String)
  content: string;

  @ManyToOne(() => ZepPost, (zepPost) => zepPost.zepComment, {
    onDelete: 'CASCADE',
  })
  @Field(() => ZepPost)
  zepPost: ZepPost;

  @ManyToOne(() => ZepUser, (zepUser) => zepUser.zepComment, {
    onDelete: 'CASCADE',
  })
  @Field(() => ZepUser)
  zepUser: ZepUser;
}
