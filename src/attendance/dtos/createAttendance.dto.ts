import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Attendance } from '../entities/attendance.entity';

@InputType()
export class CreateAttendanceInput extends PickType(Attendance, ['content']) {}

@ObjectType()
export class CreateAttendanceOutput extends CoreOutput {
  @Field(() => Attendance, { nullable: true })
  attendance?: Attendance;
}
