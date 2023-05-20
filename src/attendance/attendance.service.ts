import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { Between, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import {
  CreateAttendanceInput,
  CreateAttendanceOutput,
} from './dtos/createAttendance.dto';
import {
  DeleteAttendanceInput,
  DeleteAttendanceOutput,
} from './dtos/deleteAttendance.dto';
import { GetTodayAttendanceOutput } from './dtos/getTodayAttendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendance: Repository<Attendance>,
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {}

  async createAttendance(
    user: User,
    createAttendanceInput: CreateAttendanceInput,
  ): Promise<CreateAttendanceOutput> {
    try {
      const { content } = createAttendanceInput;
      const today = new Date();
      today.setHours(0, 0, 0, 0); // set start of the day
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const todayAttendance = await this.attendance.findOne({
        where: {
          created_at: Between(today, tomorrow),
          user: {
            id: user.id,
          },
        },
      });
      if (todayAttendance) {
        return {
          ok: false,
          error: '이미 출석을 하셨습니다.',
        };
      }
      const newAttendance = this.attendance.create({
        content,
        user,
      });
      const attendance = await this.attendance.save(newAttendance);
      return {
        ok: true,
        attendance,
      };
    } catch (e) {
      return {
        ok: false,
        error: '출석을 할 수 없습니다.',
      };
    }
  }

  async deleteAttendance(
    user: User,
    deleteAttendanceInput: DeleteAttendanceInput,
  ): Promise<DeleteAttendanceOutput> {
    try {
      const { id } = deleteAttendanceInput;
      const attendance = await this.attendance.findOne({
        where: {
          id: id,
          user: {
            id: user.id,
          },
        },
      });
      if (!attendance) {
        return {
          ok: false,
          error: '존재하지 않는 출석입니다.',
        };
      }
      await this.attendance.delete(id);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '출석을 삭제할 수 없습니다.',
      };
    }
  }

  async getTodayAttendance(): Promise<GetTodayAttendanceOutput> {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const todayAttendance = await this.attendance.find({
        where: {
          created_at: Between(today, tomorrow),
        },
      });
      return {
        ok: true,
        attendances: todayAttendance,
      };
    } catch {
      return {
        ok: false,
        error: '출석을 불러올 수 없습니다.',
      };
    }
  }
}
