import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ZepStudyTime } from './zepStudyTime.entity';

@InputType('ZepUserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class ZepUser extends CoreEntity {
  @Column({ unique: true })
  @Field(() => String)
  zep_id: string;

  @Column()
  @Field(() => String)
  nickname: string;

  @OneToMany(() => ZepStudyTime, (zepStudyTime) => zepStudyTime.zepUser)
  @Field(() => [ZepStudyTime])
  studyTimes: ZepStudyTime[];
}
