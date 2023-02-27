import { CoreEntity } from './../../common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Entity, Column } from 'typeorm';
@InputType('VisitHistoryInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class VisitHistory extends CoreEntity {
  @Column()
  @Field(() => Number)
  todayViewCount: number;

  @Column()
  @Field(() => Number)
  totalViewCount: number;

  @Column({ unique: true })
  @Field(() => String)
  dateString: string;
}
