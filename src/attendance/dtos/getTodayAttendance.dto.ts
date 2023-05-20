import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Attendance } from '../entities/attendance.entity';

@InputType()
export class GetTodayAttendanceInput {}

@ObjectType()
export class GetTodayAttendanceOutput extends CoreOutput {
  @Field(() => [Attendance], { nullable: true })
  attendances?: Attendance[];
}
