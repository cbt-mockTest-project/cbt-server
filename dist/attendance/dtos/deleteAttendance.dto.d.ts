import { CoreOutput } from 'src/common/dtos/output.dto';
import { Attendance } from '../entities/attendance.entity';
declare const DeleteAttendanceInput_base: import("@nestjs/common").Type<Pick<Attendance, "id">>;
export declare class DeleteAttendanceInput extends DeleteAttendanceInput_base {
}
export declare class DeleteAttendanceOutput extends CoreOutput {
}
export {};
