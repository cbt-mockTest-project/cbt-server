import { MockExamQuestionCommentLike } from './mock-exams/entities/mock-exam-question-comment-like.entity';
import { MockExamQuestionComment } from './mock-exams/entities/mock-exam-question-comment.entity';
import { Feedback } from './users/entities/feedback.entity';
import { MailModule } from './mail/mail.module';
import { MockExamQuestionFeedback } from './mock-exams/entities/mock-exam-question-feedback.entity';
import { MockExamQuestion } from './mock-exams/entities/mock-exam-question.entity';
import { MockExamCategory } from './mock-exams/entities/mock-exam-category.entity';
import { User } from './users/entities/user.entity';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from './users/user.module';
import { JwtModule } from './jwt/jwt.module';
import { AuthModule } from './auth/auth.module';
import { MockExamsModule } from './mock-exams/mock-exams.module';
import { MockExam } from './mock-exams/entities/mock-exam.entity';
import { UploadsModule } from './uploads/uploads.module';
import { MockExamQuestionState } from './mock-exams/entities/mock-exam-question-state.entity';
import { SchedulerModule } from './scheduler/scheduler.module';
import { Verification } from './users/entities/verification.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { RevalidateModule } from './revalidate/revalidate.module';
import { TelegramModule } from './telegram/telegram.module';
import { Notice } from './users/entities/notice.entity';
import { MockExamQuestionBookmark } from './mock-exams/entities/mock-exam-question-bookmark.entity';
import { CrawlerModule } from './crawler/crawler.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV == 'dev' ? '.env.dev' : '.env.prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        PRIVATE_KEY: Joi.string().required(),
        REVALIDATE_KEY: Joi.string().required(),
        TELEGRAM_BOT_TOKEN: Joi.string().required(),
        TELEGRAM_ALRAM_CHANNEL: Joi.string().required(),
      }),
    }),
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true, // 스키마 사전순으로 정렬
      cors: {
        credentials: true,
        origin:
          process.env.NODE_ENV == 'dev'
            ? [process.env.CLIENT_URL, process.env.ADMIN_URL]
            : [process.env.CLIENT_URL, process.env.NAVER_CRAWLER_BOT_URL],
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV !== 'prod',
      logging: false,
      entities: [
        User,
        Verification,
        MockExam,
        MockExamCategory,
        MockExamQuestion,
        MockExamQuestionFeedback,
        MockExamQuestionState,
        Feedback,
        MockExamQuestionComment,
        MockExamQuestionCommentLike,
        MockExamQuestionBookmark,
        Notice,
      ],
    }),
    UserModule,
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY,
    }),
    TelegramModule.forRoot({
      token: process.env.TELEGRAM_BOT_TOKEN,
      alramChannelId: Number(process.env.TELEGRAM_ALRAM_CHANNEL),
    }),
    RevalidateModule.forRoot({
      revalidateKey: process.env.REVALIDATE_KEY,
      clientUrl:
        process.env.NODE_ENV === 'dev'
          ? process.env.PRODUCT_CLIENT_URL
          : process.env.CLIENT_URL,
    }),
    AuthModule,
    MockExamsModule,
    UploadsModule,
    SchedulerModule,
    MailModule,
    MailerModule.forRoot({
      transport: `smtps://${process.env.EMAIL_AUTH_EMAIL}:${process.env.EMAIL_AUTH_PASSWORD}@${process.env.EMAIL_HOST}`,
      defaults: {
        from: `"${process.env.EMAIL_FROM_USER_NAME}" <${process.env.EMAIL_AUTH_EMAIL}>`,
      },
      preview: false,
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    RevalidateModule,
    TelegramModule,
    CrawlerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
