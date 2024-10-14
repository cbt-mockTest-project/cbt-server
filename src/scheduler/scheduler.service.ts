import { TelegramService } from './../telegram/telegram.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserService } from 'src/users/user.service';
import { MockExamQuestionFeedbackSerivce } from 'src/exam/mock-exams-question-feedback.service';
import { MockExam } from 'src/exam/entities/mock-exam.entity';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';

@Injectable()
export class SchedulerService implements OnModuleInit {
  private isMaster: boolean;
  constructor(
    @InjectRepository(MockExam)
    private readonly mockExams: Repository<MockExam>,
    @InjectRepository(MockExamCategory)
    private readonly mockExamCategories: Repository<MockExamCategory>,
    private readonly telegramService: TelegramService,
    private readonly userService: UserService,
    private readonly mockExamQuestionFeedbackService: MockExamQuestionFeedbackSerivce,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  onModuleInit() {
    this.isMaster = process.env.NODE_APP_INSTANCE === '0';
    const isDev = process.env.NODE_ENV === 'dev';
    const isCronJobInstance = process.env.CRON_JOB === 'ok';
    if (!this.isMaster || isDev || isCronJobInstance) {
      const cronJobs = this.schedulerRegistry.getCronJobs();
      cronJobs.forEach((job, jobName) => {
        this.schedulerRegistry.deleteCronJob(jobName);
      });
    }
  }
  // 새벽 3시
  @Cron('0 0 3 * * *', { timeZone: 'Asia/Seoul' })
  async hideNegativeFeedbacks() {
    try {
      if (process.env.NODE_ENV === 'dev' && process.env.CRON_JOB === 'ok') {
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
      if (process.env.NODE_ENV === 'dev' && process.env.CRON_JOB === 'ok') {
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
  // 새벽 7시
  @Cron('0 0 7 * * *', { timeZone: 'Asia/Seoul' })
  async clearBasicPlan() {
    try {
      if (process.env.NODE_ENV === 'dev' && process.env.CRON_JOB === 'ok') {
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
  // 새벽 2시
  @Cron('0 0 2 * * *', { timeZone: 'Asia/Seoul' })
  async syncEvaluationCount() {
    try {
      if (process.env.NODE_ENV === 'dev' && process.env.CRON_JOB === 'ok') {
        return;
      }
      const mockExamCategories = await this.mockExamCategories.find({
        relations: {
          categoryEvaluations: true,
        },
      });

      for (const mockExamCategory of mockExamCategories) {
        if (mockExamCategory.categoryEvaluations.length > 0) {
          await this.mockExamCategories.update(mockExamCategory.id, {
            evaluationCount: mockExamCategory.categoryEvaluations.length,
          });
        }
      }
    } catch {
      this.telegramService.sendMessageToTelegram({
        message: `cronjob: syncEvaluationCount error`,
        channelId: Number(process.env.TELEGRAM_ALRAM_CHANNEL),
      });
    }
  }
}
