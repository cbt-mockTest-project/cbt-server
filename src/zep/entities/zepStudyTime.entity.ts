import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ZepUser } from './zepUser.entity';

@InputType('ZepStudyTimeInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class ZepStudyTime extends CoreEntity {
  @Column({ default: 0 })
  @Field(() => Number)
  grass_count: number;

  @Column({ default: 0 })
  @Field(() => Number)
  study_time: number;

  @Column()
  date: string;

  @ManyToOne(() => ZepUser, (zepUser) => zepUser.studyTimes, {
    onDelete: 'CASCADE',
  })
  @Field(() => ZepUser)
  zepUser: ZepUser;
}
