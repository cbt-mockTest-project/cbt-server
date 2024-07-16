import { TelegramService } from './../telegram/telegram.service';
import { MockExamQuestion } from '../exam/entities/mock-exam-question.entity';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, Interval } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VisitService } from 'src/visit/visit.service';
import { UserService } from 'src/users/user.service';
import { RevalidateService } from 'src/revalidate/revalidate.service';
import { BlogManageService } from 'src/blogManage/blog-manage.service';
import { MockExamQuestionFeedbackSerivce } from 'src/exam/mock-exams-question-feedback.service';
import { MockExam } from 'src/exam/entities/mock-exam.entity';

@Injectable()
export class SchedulerService {
  constructor(
    @InjectRepository(MockExamQuestion)
    private readonly mockExamQuestions: Repository<MockExamQuestion>,
    @InjectRepository(MockExam)
    private readonly mockExams: Repository<MockExam>,
    private readonly configService: ConfigService,
    private readonly visitService: VisitService,
    private readonly telegramService: TelegramService,
    private readonly userService: UserService,
    private readonly revalidateService: RevalidateService,
    private readonly blogManageSevice: BlogManageService,
    private readonly mockExamQuestionFeedbackService: MockExamQuestionFeedbackSerivce,
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

  // @Cron('0 56 23 * * *', { timeZone: 'Asia/Seoul' })
  // async resetRandomExamLimit() {
  //   try {
  //     if (process.env.NODE_ENV === 'dev') {
  //       return;
  //     }
  //     const res = await this.userService.resetRandomExamLimit();
  //     if (res.ok) {
  //       this.telegramService.sendMessageToTelegram({
  //         message: `cronjob: resetRandomExam success`,
  //         channelId: Number(process.env.TELEGRAM_ALRAM_CHANNEL),
  //       });
  //     }
  //     if (!res.ok) {
  //       this.telegramService.sendMessageToTelegram({
  //         message: `cronjob: resetRandomExam error`,
  //         channelId: Number(process.env.TELEGRAM_ALRAM_CHANNEL),
  //       });
  //     }
  //     return;
  //   } catch {
  //     this.telegramService.sendMessageToTelegram({
  //       message: `cronjob: resetRandomExam error`,
  //       channelId: Number(process.env.TELEGRAM_ALRAM_CHANNEL),
  //     });
  //   }
  // }

  //3분에 한번
  // @Interval(1000 * 60 * 1)
  // async pong() {
  //   try {
  //     if (process.env.NODE_ENV === 'dev') {
  //       return;
  //     }
  //     const clientUrl = this.configService.get('CLIENT_URL');
  //     await axios.get(clientUrl);
  //   } catch {
  //     this.telegramService.sendMessageToTelegram({
  //       message: `cronjob: ping error`,
  //       channelId: Number(process.env.TELEGRAM_ALRAM_CHANNEL),
  //     });
  //   }
  // }

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
        .leftJoinAndSelect('mockExam.mockExamCategory', 'mockExamCategory')
        .where('mockExamCategory.id IS NULL AND mockExam.approved = true')
        .getMany();

      exams.forEach((exam) => {
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
  // 새벽 4시
  @Cron('0 0 4 * * *', { timeZone: 'Asia/Seoul' })
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

  //6시간마다
  // @Cron('0 */5 * * *')
  // async naverViewMacro() {
  //   await this.crawlerService.naverBlogViewMacro();
  // }

  // 월요일 02:30am
  // @Cron('0 30 2 * * 1')
  // async clearS3() {
  //   const BUCKET_NAME = this.configService.get('AWS_BUCKEY_NAME');
  //   AWS.config.update({
  //     credentials: {
  //       accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
  //       secretAccessKey: this.configService.get('AWS_SECRET_KEY'),
  //     },
  //   });
  //   let awsListKeys: string[];
  //   let examImageList: (string | MockExamImageType)[] = [];
  //   (await this.mockExamQuestions.find()).map((question) => {
  //     examImageList = examImageList.concat(
  //       question.question_img,
  //       question.solution_img,
  //     );
  //     return;
  //   });
  //   examImageList = examImageList.map(
  //     (image: MockExamImageType) =>
  //       image.url.split('https://cbteungwangnestjs961203.s3.amazonaws.com/')[1],
  //   );
  //   const s3Client = new AWS.S3();
  //   await s3Client
  //     .listObjects({ Bucket: BUCKET_NAME }, function (err, data) {
  //       if (err) {
  //         console.log('Error', err);
  //       } else {
  //         awsListKeys = data.Contents.map((el) => el.Key);
  //       }
  //     })
  //     .promise();
  //   const imageListForDelete = findUniqElem(awsListKeys, examImageList);
  //   imageListForDelete.map(async (key) => {
  //     await s3Client
  //       .deleteObject(
  //         { Bucket: BUCKET_NAME, Key: String(key) },
  //         (err, data) => {
  //           if (err) {
  //             throw err;
  //           }
  //         },
  //       )
  //       .promise();
  //   });
  //   console.log('s3 clean up');
  // }
}
