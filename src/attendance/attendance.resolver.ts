import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Attendance } from './entities/attendance.entity';
import { AttendanceService } from './attendance.service';
import {
  CreateAttendanceInput,
  CreateAttendanceOutput,
} from './dtos/createAttendance.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/auth/role.decorators';
import {
  DeleteAttendanceInput,
  DeleteAttendanceOutput,
} from './dtos/deleteAttendance.dto';
import { GetTodayAttendanceOutput } from './dtos/getTodayAttendance.dto';

@Resolver(() => Attendance)
export class AttendanceResolver {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Role(['ANY'])
  @Mutation(() => CreateAttendanceOutput)
  async createAttendance(
    @AuthUser() user: User,
    @Args('input') createAttendanceInput: CreateAttendanceInput,
  ): Promise<CreateAttendanceOutput> {
    return this.attendanceService.createAttendance(user, createAttendanceInput);
  }

  @Role(['ANY'])
  @Mutation(() => DeleteAttendanceOutput)
  async deleteAttendance(
    @AuthUser() user: User,
    @Args('input') deleteAttendanceInput: DeleteAttendanceInput,
  ): Promise<DeleteAttendanceOutput> {
    return this.attendanceService.deleteAttendance(user, deleteAttendanceInput);
  }

  @Query(() => GetTodayAttendanceOutput)
  async getTodayAttendance(): Promise<GetTodayAttendanceOutput> {
    return this.attendanceService.getTodayAttendance();
  }
}
