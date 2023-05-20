import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

@InputType('ZepMapUserCountInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class ZepMapUserCount extends CoreEntity {
  @Column({ unique: true })
  @Field(() => String)
  mapId: string;

  @Column()
  @Field(() => Number)
  userCount: number;
}
