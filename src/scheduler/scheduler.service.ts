import { TelegramService } from './../telegram/telegram.service';
import { MockExamQuestion } from '../exam/entities/mock-exam-question.entity';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { VisitService } from 'src/visit/visit.service';
import { UserService } from 'src/users/user.service';
import { MockExamQuestionFeedbackSerivce } from 'src/exam/mock-exams-question-feedback.service';
import { MockExam } from 'src/exam/entities/mock-exam.entity';
import { CoupangService } from 'src/modu-shop/coupang/coupang.service';

@Injectable()
export class SchedulerService {
  constructor(
    @InjectRepository(MockExamQuestion)
    private readonly mockExamQuestions: Repository<MockExamQuestion>,
    @InjectRepository(MockExam)
    private readonly mockExams: Repository<MockExam>,
    private readonly visitService: VisitService,
    private readonly telegramService: TelegramService,
    private readonly userService: UserService,
    private readonly mockExamQuestionFeedbackService: MockExamQuestionFeedbackSerivce,
    private readonly coupangService: CoupangService,
  ) {}

  // // 매일 밤 12시
  @Cron('0 59 23 * * *', { timeZone: 'Asia/Seoul' })
  async clearVisit() {
    if (process.env.NODE_ENV === 'dev') {
      return;
    }
    try {
      await this.visitService.clearVisit();
    } catch {
      await this.telegramService.sendMessageToTelegram({
        message: `방문자수 초기화 실패`,
        channelId: Number(process.env.TELEGRAM_ALRAM_CHANNEL),
      });
    }
  }

  // 새벽 3시
  @Cron('0 0 3 * * *', { timeZone: 'Asia/Seoul' })
  async hideNegativeFeedbacks() {
    try {
      if (process.env.NODE_ENV === 'dev') {
        return;
      }
      // recommendation.type === 'BAD' 인 요소를 3개 이상 가진 feedback private로 변경
      await this.mockExamQuestionFeedbackService.hideNegativeFeedbacks();
      this.telegramService.sendMessageToTelegram({
        message: `cronjob: hideNegativeFeedbacks success`,
        channelId: Number(process.env.TELEGRAM_ALRAM_CHANNEL),
      });
    } catch {
      this.telegramService.sendMessageToTelegram({
        message: `cronjob: hideNegativeFeedbacks error`,
        channelId: Number(process.env.TELEGRAM_ALRAM_CHANNEL),
      });
    }
  }
  // 새벽 3시
  @Cron('0 0 3 * * *', { timeZone: 'Asia/Seoul' })
  async manageExamApproval() {
    try {
      if (process.env.NODE_ENV === 'dev') {
        return;
      }
      const exams = await this.mockExams
        .createQueryBuilder('mockExam')
        .leftJoinAndSelect('mockExam.user', 'user')
        .leftJoinAndSelect('mockExam.mockExamCategory', 'mockExamCategory')
        .where('mockExamCategory.id IS NULL AND mockExam.approved = true')
        .orWhere(
          'mockExamCategory.isPublic = false AND mockExam.approved = true AND mockExam.user.id = mockExamCategory.user.id',
        )
        .getMany();
      const examIds = exams.map((exam) => exam.id);
      const duplicated = await this.mockExams.find({
        where: {
          mockExamCategory: {
            isPublic: true,
          },
          id: In(examIds),
          approved: true,
        },
      });
      const duplicatedIds = duplicated.map((exam) => exam.id);
      const filtered = exams.filter((exam) => !duplicatedIds.includes(exam.id));
      filtered.forEach((exam) => {
        this.mockExams.update({ id: exam.id }, { approved: false });
      });

      this.telegramService.sendMessageToTelegram({
        message: `cronjob: manageExamApproval success`,
        channelId: Number(process.env.TELEGRAM_ALRAM_CHANNEL),
      });
    } catch {
      this.telegramService.sendMessageToTelegram({
        message: `cronjob: manageExamApproval error`,
        channelId: Number(process.env.TELEGRAM_ALRAM_CHANNEL),
      });
    }
  }
  // 새벽 5시
  @Cron('0 0 5 * * *', { timeZone: 'Asia/Seoul' })
  async clearBasicPlan() {
    try {
      if (process.env.NODE_ENV === 'dev') {
        return;
      }
      this.userService.clearBasicRole();
      this.telegramService.sendMessageToTelegram({
        message: `cronjob: clearBasicPlan success`,
        channelId: Number(process.env.TELEGRAM_ALRAM_CHANNEL),
      });
    } catch {
      this.telegramService.sendMessageToTelegram({
        message: `cronjob: clearBasicPlan error`,
        channelId: Number(process.env.TELEGRAM_ALRAM_CHANNEL),
      });
    }
  }

  // 새벽 6시
  @Cron('0 0 6 * * *', { timeZone: 'Asia/Seoul' })
  async updateProductList() {
    try {
      const keywords = [
        '독서대',
        '스터디 플래너',
        '공부타이머',
        '지워지는볼펜',
        '전자노트',
        '에너지드링크',
        '공책',
        '노트북 거치대',
        '포스트잇',
      ];
      keywords.forEach((keyword) => {
        this.coupangService.crawlProductListFromCoupang(keyword);
      });
    } catch {
      this.telegramService.sendMessageToTelegram({
        message: `cronjob: updateProductList error`,
        channelId: Number(process.env.TELEGRAM_ALRAM_CHANNEL),
      });
    }
  }
}
