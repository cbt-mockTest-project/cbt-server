import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Attendance } from '../entities/attendance.entity';

@InputType()
export class DeleteAttendanceInput extends PickType(Attendance, ['id']) {}

@ObjectType()
export class DeleteAttendanceOutput extends CoreOutput {}
