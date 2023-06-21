import { CoreOutput } from 'src/common/dtos/output.dto';
import { Attendance } from '../entities/attendance.entity';
declare const CreateAttendanceInput_base: import("@nestjs/common").Type<Pick<Attendance, "content">>;
export declare class CreateAttendanceInput extends CreateAttendanceInput_base {
}
export declare class CreateAttendanceOutput extends CoreOutput {
    attendance?: Attendance;
}
export {};
