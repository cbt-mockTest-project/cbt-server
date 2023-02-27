import { CreateVisitHistoryOutput } from './dtos/createVisitHistory.dto';
import { VisitHistory } from 'src/visit/entities/visitHistory.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { ReadVisitCountOutput } from './dtos/readVisitCount.dto';
import { Visit } from './entities/visit.entity';
import { format, subDays } from 'date-fns';
import { ReadVisitHistoryOutput } from './dtos/readVisitHistory.dto';
@Injectable()
export class VisitService {
  constructor(
    @InjectRepository(Visit) private readonly visit: Repository<Visit>,
    @InjectRepository(VisitHistory)
    private readonly visitHistory: Repository<VisitHistory>,
  ) {}

  async createVisit(user: User): Promise<CoreOutput> {
    try {
      const newVisit = this.visit.create({ user });
      await this.visit.save(newVisit);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'fail visit count',
      };
    }
  }

  async clearVisit(): Promise<CoreOutput> {
    try {
      await this.visit.clear();
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'fail visit clear',
      };
    }
  }

  // @deprecated 예정
  async readVisitCount(): Promise<ReadVisitCountOutput> {
    try {
      const count = await this.visit.count();
      return {
        ok: true,
        count,
      };
    } catch {
      return {
        ok: false,
        error: 'fail read visit count',
      };
    }
  }

  async createVisitHistory(): Promise<CreateVisitHistoryOutput> {
    try {
      const today = new Date();
      const formatedToday = format(today, 'yy-MM-dd');
      const formatedYesterday = format(subDays(today, 1), 'yy-MM-dd');
      const todayViewCount = await this.visit.count();
      const todayVisitHistory = await this.visitHistory.findOne({
        where: { dateString: formatedToday },
      });
      if (todayVisitHistory) {
        return {
          ok: false,
          error: '오늘의 기록이 이미 존재합니다.',
        };
      }
      const yesterdayVisitHistory = await this.visitHistory.findOne({
        where: { dateString: formatedYesterday },
      });
      if (!yesterdayVisitHistory) {
        return {
          ok: false,
          error: '이전날의 기록이 없습니다.',
        };
      }
      const totalViewCount =
        yesterdayVisitHistory.totalViewCount + todayViewCount;
      const newTodayVisitHistory = this.visitHistory.create({
        totalViewCount,
        todayViewCount,
        dateString: formatedToday,
      });
      const result = await this.visitHistory.save(newTodayVisitHistory);

      return {
        ok: true,
        totalViewCount: result.totalViewCount,
        todayViewCount: result.todayViewCount,
      };
    } catch {
      return {
        ok: false,
        error: '오늘의 방문기록을 실패했습니다.',
      };
    }
  }

  async readVisitHistory(): Promise<ReadVisitHistoryOutput> {
    const todayViewCount = await this.visit.count();
    const formatedYesterday = format(subDays(new Date(), 1), 'yy-MM-dd');
    const visitHistory = await this.visitHistory.findOne({
      where: {
        dateString: formatedYesterday,
      },
    });
    if (!visitHistory) {
      return {
        ok: false,
        error: '기록이 존재하지 않습니다.',
      };
    }
    const { totalViewCount, todayViewCount: yesterdayViewCount } = visitHistory;
    return {
      ok: true,
      today: todayViewCount,
      yesterday: yesterdayViewCount,
      total: totalViewCount,
    };
  }
}
