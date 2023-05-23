import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

@InputType('VideoInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Video extends CoreEntity {
  @Column()
  @Field(() => String)
  url: string;

  @Column()
  @Field(() => Number)
  size: number;
}
