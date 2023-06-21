import { AttendanceService } from './attendance.service';
import { CreateAttendanceInput, CreateAttendanceOutput } from './dtos/createAttendance.dto';
import { User } from 'src/users/entities/user.entity';
import { DeleteAttendanceInput, DeleteAttendanceOutput } from './dtos/deleteAttendance.dto';
import { GetTodayAttendanceOutput } from './dtos/getTodayAttendance.dto';
export declare class AttendanceResolver {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    createAttendance(user: User, createAttendanceInput: CreateAttendanceInput): Promise<CreateAttendanceOutput>;
    deleteAttendance(user: User, deleteAttendanceInput: DeleteAttendanceInput): Promise<DeleteAttendanceOutput>;
    getTodayAttendance(): Promise<GetTodayAttendanceOutput>;
}
