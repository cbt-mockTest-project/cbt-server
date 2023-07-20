import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PostData } from './postData.entity';

@InputType('PostFile', { isAbstract: true })
@ObjectType()
@Entity()
export class PostFile extends CoreEntity {
  @Column()
  @Field(() => Number, { defaultValue: 0 })
  price: number;

  @Column()
  @Field(() => String, { defaultValue: '' })
  name: string;

  @Column()
  @Field(() => String, { defaultValue: '' })
  url: string;

  @ManyToOne(() => PostData, (postData) => postData.postFile)
  @Field(() => PostData)
  postData: PostFile;
}
