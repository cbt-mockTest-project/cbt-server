import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@InputType('AttendanceInputTyper', { isAbstract: true })
@ObjectType()
@Entity()
export class Attendance extends CoreEntity {
  @Column()
  @Field(() => String)
  content: string;

  @ManyToOne(() => User, (user) => user.attendances, { onDelete: 'CASCADE' })
  @Field(() => User)
  user: User;
}
