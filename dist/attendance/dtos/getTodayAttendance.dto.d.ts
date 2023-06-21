import { CoreOutput } from 'src/common/dtos/output.dto';
import { Attendance } from '../entities/attendance.entity';
export declare class GetTodayAttendanceInput {
}
export declare class GetTodayAttendanceOutput extends CoreOutput {
    attendances?: Attendance[];
}
