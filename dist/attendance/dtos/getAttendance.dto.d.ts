import { CoreOutput } from 'src/common/dtos/output.dto';
import { Attendance } from '../entities/attendance.entity';
export declare class GetAttendanceInput {
    date: {
        year: number;
        month: number;
        day: number;
    };
}
export declare class GetAttendanceOutput extends CoreOutput {
    attendances?: Attendance[];
}
