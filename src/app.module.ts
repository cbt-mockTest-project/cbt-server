import { QuestionCardCategory } from './question-card/entities/question-card-category';
import { RootModule } from './root/root.module';
import { MockExamQuestionMultipleChoice } from './mock-exams/entities/mock-exam-question-multiple-choice.entity';
import { PostComment } from './post/entities/postComment.entity';
import { PostCommentLike } from './post/entities/postCommentLike.entity';
import { Post } from './post/entities/post.entity';
import { MockExamQuestionCommentLike } from './mock-exams/entities/mock-exam-question-comment-like.entity';
import { MockExamQuestionComment } from './mock-exams/entities/mock-exam-question-comment.entity';
import { Feedback } from './users/entities/feedback.entity';
import { MailModule } from './mail/mail.module';
import { MockExamQuestionFeedback } from './mock-exams/entities/mock-exam-question-feedback.entity';
import { MockExamQuestion } from './mock-exams/entities/mock-exam-question.entity';
import { MockExamCategory } from './mock-exams/entities/mock-exam-category.entity';
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
import { PostModule } from './post/post.module';
import { PostLike } from './post/entities/postLike.entity';
import { CommonModule } from './common/common.module';
import { Visit } from './visit/entities/visit.entity';
import { VisitModule } from './visit/visit.module';
import { VisitHistory } from './visit/entities/visitHistory.entity';
import { MockExamHistory } from './mock-exams/entities/mock-exam-history';
import { QuestionCardModule } from './question-card/question-card.module';
import { QuestionCard } from './question-card/entities/question-card.entity';
import { ExamCoAuthorModule } from './exam-co-author/exam-co-author.module';
import { ExamCoAuthor } from './exam-co-author/entities/exam-co-author.entity';
import { MockExamQuestionFeedbackRecommendation } from './mock-exams/entities/mock-exam-question-feedback-recommendation.entity';
import { User } from './users/entities/user.entity';

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
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
      sortSchema: true, // 스키마 사전순으로 정렬
      subscriptions: {
        'subscriptions-transport-ws': {
          onConnect: (connectionParams, websocket, context) => {
            return { headers: websocket.upgradeReq.headers };
          },
        },
      },
      context: ({ req }) => {
        if (req) {
          return { headers: req.headers };
        }
      },
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
        ExamCoAuthor,
        QuestionCard,
        QuestionCardCategory,
        User,
        Verification,
        MockExam,
        MockExamHistory,
        MockExamCategory,
        MockExamQuestion,
        MockExamQuestionFeedback,
        MockExamQuestionState,
        Feedback,
        MockExamQuestionComment,
        MockExamQuestionCommentLike,
        MockExamQuestionBookmark,
        MockExamQuestionMultipleChoice,
        MockExamQuestionFeedbackRecommendation,
        Notice,
        Post,
        PostComment,
        PostCommentLike,
        PostLike,
        Visit,
        VisitHistory,
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
          ? process.env.CLIENT_URL
          : process.env.PRODUCT_CLIENT_URL,
    }),
    AuthModule,
    ExamCoAuthorModule,
    MockExamsModule,
    UploadsModule,
    SchedulerModule,
    MailModule,
    RootModule,
    VisitModule,
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
    PostModule,
    CommonModule,
    QuestionCardModule,
    ExamCoAuthorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
