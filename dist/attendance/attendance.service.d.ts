import { Attendance } from './entities/attendance.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateAttendanceInput, CreateAttendanceOutput } from './dtos/createAttendance.dto';
import { DeleteAttendanceInput, DeleteAttendanceOutput } from './dtos/deleteAttendance.dto';
import { GetTodayAttendanceOutput } from './dtos/getTodayAttendance.dto';
import { GetAttendanceInput, GetAttendanceOutput } from './dtos/getAttendance.dto';
export declare class AttendanceService {
    private readonly attendance;
    private readonly user;
    constructor(attendance: Repository<Attendance>, user: Repository<User>);
    createAttendance(user: User, createAttendanceInput: CreateAttendanceInput): Promise<CreateAttendanceOutput>;
    deleteAttendance(user: User, deleteAttendanceInput: DeleteAttendanceInput): Promise<DeleteAttendanceOutput>;
    getTodayAttendance(): Promise<GetTodayAttendanceOutput>;
    getAttendance(getAttendanceInput: GetAttendanceInput): Promise<GetAttendanceOutput>;
}
