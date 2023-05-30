import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ZepUser } from './zepUser.entity';
import { IsEnum } from 'class-validator';
import { ZepComment } from './zepComment.entity';

export enum ZepPostCategory {
  FREE = 'FREE', // 자유
  STUDY = 'STUDY', // 스터디
  NOTICE = 'NOTICE', //공지
}

registerEnumType(ZepPostCategory, { name: 'ZepPostCategory' });

@InputType('ZepPostInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class ZepPost extends CoreEntity {
  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  content: string;

  @ManyToOne(() => ZepUser, (zepUser) => zepUser.zepPost, {
    onDelete: 'CASCADE',
  })
  @Field(() => ZepUser)
  zepUser: ZepUser;

  @OneToMany(() => ZepComment, (zepComment) => zepComment.zepPost)
  @Field(() => [ZepComment])
  zepComment: ZepComment[];

  @Column({
    type: 'enum',
    enum: ZepPostCategory,
    default: ZepPostCategory.FREE,
  })
  @Field(() => ZepPostCategory)
  @IsEnum(ZepPostCategory)
  category: ZepPostCategory;
}
