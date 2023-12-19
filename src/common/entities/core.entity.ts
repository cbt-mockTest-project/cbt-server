import { Field, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@ObjectType()
export class TimeStampedEntity {
  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;
}

@ObjectType()
export class CoreEntity extends TimeStampedEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;
}
