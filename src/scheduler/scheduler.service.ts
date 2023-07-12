import { TelegramService } from './../telegram/telegram.service';
import {
  MockExamQuestion,
  // MockExamImageType,
} from './../mock-exams/entities/mock-exam-question.entity';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, Interval } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
// import * as AWS from 'aws-sdk';
// import { findUniqElem } from 'src/utils/utils';
import { Repository } from 'typeorm';
import { CrawlerService } from 'src/blogManage/blogManage.service';
import { VisitService } from 'src/visit/visit.service';
import { UserService } from 'src/users/user.service';

@Injectable()
export class SchedulerService {
  constructor(
    @InjectRepository(MockExamQuestion)
    private readonly mockExamQuestions: Repository<MockExamQuestion>,
    private readonly configService: ConfigService,
    private readonly crawlerService: CrawlerService,
    private readonly visitService: VisitService,
    private readonly telegramService: TelegramService,
    private readonly userService: UserService,
  ) {}
  // 매일 밤 12시
  @Cron('0 55 23 * * *', { timeZone: 'Asia/Seoul' })
  async clearVisit() {
    if (process.env.NODE_ENV === 'dev') {
      return;
    }
    try {
      const { totalViewCount, todayViewCount } =
        await this.visitService.createVisitHistory();
      await this.visitService.clearVisit();
      await this.telegramService.sendMessageToAlramChannelOfTelegram({
        message: `오늘의 방문자수는 ${todayViewCount}명입니다.\n지금까지 총 방문자수는 ${totalViewCount}명입니다.`,
      });
    } catch {
      await this.telegramService.sendMessageToAlramChannelOfTelegram({
        message: `방문자수 기록 실패`,
      });
    }
  }

  // 1시간에 1번
  @Interval(1000 * 60 * 60)
  async clearFreeTrial() {
    if (process.env.NODE_ENV === 'dev') {
      return;
    }
    const res = await this.userService.clearFreeTrialRole();
    // if (res.ok) {
    //   await this.telegramService.sendMessageToAlramChannelOfTelegram({
    //     message: `무료체험권 만료갯수: ${res.count} `,
    //   });
    // }
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
