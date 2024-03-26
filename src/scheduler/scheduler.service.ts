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

@Injectable()
export class SchedulerService {
  constructor(
    @InjectRepository(MockExamQuestion)
    private readonly mockExamQuestions: Repository<MockExamQuestion>,
    private readonly configService: ConfigService,
    private readonly visitService: VisitService,
    private readonly telegramService: TelegramService,
    private readonly userService: UserService,
    private readonly revalidateService: RevalidateService,
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

  @Cron('0 55 23 * * *', { timeZone: 'Asia/Seoul' })
  async resetSolveLimit() {
    try {
      if (process.env.NODE_ENV === 'dev') {
        return;
      }
      const res = await this.userService.resetSolveLimit();
      if (res.ok) {
        this.telegramService.sendMessageToTelegram({
          message: `cronjob: resetSolveLimit success`,
          channelId: Number(process.env.TELEGRAM_ALRAM_CHANNEL),
        });
      }
      if (!res.ok) {
        this.telegramService.sendMessageToTelegram({
          message: `cronjob: resetSolveLimit error`,
          channelId: Number(process.env.TELEGRAM_ALRAM_CHANNEL),
        });
      }
      return;
    } catch {
      this.telegramService.sendMessageToTelegram({
        message: `cronjob: resetSolveLimit error`,
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

  // 오전 4시
  @Cron('0 0 4 * * *', { timeZone: 'Asia/Seoul' })
  async revalidateQuestion() {
    try {
      if (process.env.NODE_ENV === 'dev') {
        return;
      }

      async function* generateBatches(questionIds, batchSize) {
        for (let i = 0; i < questionIds.length; i += batchSize) {
          yield questionIds.slice(i, i + batchSize);
        }
      }

      const res = await this.mockExamQuestions.find();
      const questionIds = res.map((el) => el.id);
      const batchSize = 30; // 한 번에 처리할 질문의 수
      for await (const batch of generateBatches(questionIds, batchSize)) {
        await Promise.all(
          batch.map((id) =>
            this.revalidateService.revalidate({
              path: `/question/${id}`,
            }),
          ),
        );
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
      this.telegramService.sendMessageToTelegram({
        message: `cronjob: revalidate success`,
        channelId: Number(process.env.TELEGRAM_ALRAM_CHANNEL),
      });
    } catch {
      this.telegramService.sendMessageToTelegram({
        message: `cronjob: revalidate error`,
        channelId: Number(process.env.TELEGRAM_ALRAM_CHANNEL),
      });
      console.log('cronjob: revalidate error');
    }
  }

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

  // 1시간에 1번
  // @Interval(1000 * 60 * 60)
  // async clearFreeTrial() {
  //   if (process.env.NODE_ENV === 'dev') {
  //     return;
  //   }
  //   const res = await this.userService.clearFreeTrialRole();
  //   // if (res.ok) {
  //   //   await this.telegramService.sendMessageToTelegram({
  //   //     message: `무료체험권 만료갯수: ${res.count} `,
  //   //   });
  //   // }
  // }

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
