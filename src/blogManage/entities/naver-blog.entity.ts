import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@InputType('NaverBlogInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class NaverBlog {
  @PrimaryColumn()
  @Field(() => String)
  key: string;

  @Column({
    default: '',
  })
  @Field(() => String)
  value: string;
}
