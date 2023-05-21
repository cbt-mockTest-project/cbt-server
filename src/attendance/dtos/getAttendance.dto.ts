import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Attendance } from '../entities/attendance.entity';

@InputType()
export class GetAttendanceInput {
  date: {
    year: number;
    month: number;
    day: number;
  };
}

@ObjectType()
export class GetAttendanceOutput extends CoreOutput {
  @Field(() => [Attendance], { nullable: true })
  attendances?: Attendance[];
}
