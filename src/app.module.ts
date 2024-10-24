import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { BlogManageModule } from './blogManage/blog-manage.module';
import { ExamCoAuthor } from './exam-co-author/entities/exam-co-author.entity';
import { ExamCoAuthorModule } from './exam-co-author/exam-co-author.module';
import { JwtModule } from './jwt/jwt.module';
import logger from './lib/logger';
import { LoggingInterceptor } from './logging.interceptor';
import { MailModule } from './mail/mail.module';
import { MockExamHistory } from './exam/entities/mock-exam-history';
import { MockExamQuestionBookmark } from './exam/entities/mock-exam-question-bookmark.entity';
import { MockExamQuestionCommentLike } from './exam/entities/mock-exam-question-comment-like.entity';
import { MockExamQuestionComment } from './exam/entities/mock-exam-question-comment.entity';
import { MockExamQuestionFeedbackRecommendation } from './exam/entities/mock-exam-question-feedback-recommendation.entity';
import { MockExamQuestionFeedback } from './exam/entities/mock-exam-question-feedback.entity';
import { MockExamQuestionMultipleChoice } from './exam/entities/mock-exam-question-multiple-choice.entity';
import { MockExamQuestionState } from './exam/entities/mock-exam-question-state.entity';
import { MockExamQuestion } from './exam/entities/mock-exam-question.entity';
import { MockExam } from './exam/entities/mock-exam.entity';
import { MockExamsModule } from './exam/mock-exams.module';
import { Post } from './post/entities/post.entity';
import { PostComment } from './post/entities/postComment.entity';
import { PostCommentLike } from './post/entities/postCommentLike.entity';
import { PostLike } from './post/entities/postLike.entity';
import { PostModule } from './post/post.module';
import { QuestionCardCategory } from './question-card/entities/question-card-category';
import { QuestionCard } from './question-card/entities/question-card.entity';
import { QuestionCardModule } from './question-card/question-card.module';
import { RevalidateModule } from './revalidate/revalidate.module';
import { RootModule } from './root/root.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { TelegramModule } from './telegram/telegram.module';
import { UploadsModule } from './uploads/uploads.module';
import { Feedback } from './users/entities/feedback.entity';
import { Notice } from './users/entities/notice.entity';
import { User } from './users/entities/user.entity';
import { Verification } from './users/entities/verification.entity';
import { UserModule } from './users/user.module';
import { Visit } from './visit/entities/visit.entity';
import { VisitHistory } from './visit/entities/visitHistory.entity';
import { VisitModule } from './visit/visit.module';
import { ZepModule } from './zep/zep.module';
import { ZepUser } from './zep/entities/zepUser.entity';
import { ZepStudyTime } from './zep/entities/zepStudyTime.entity';
import { PaymentsModule } from './payments/payments.module';
import { Payment } from './payments/entities/payment.entity';
import { UserAndRole } from './users/entities/userAndRole.entity';
import { Role } from './users/entities/role.entity';
import { AttendanceModule } from './attendance/attendance.module';
import { Attendance } from './attendance/entities/attendance.entity';
import { ZepMapUserCount } from './zep/entities/zepMapUserCount.entity';
import { VideoModule } from './video/video.module';
import { Video } from './video/entities/video.entity';
import { PartnersModule } from './partners/partners.module';
import { Partner } from './partners/entities/partners.entity';
import { ZepComment } from './zep/entities/zepComment.entity';
import { ZepPost } from './zep/entities/zepPost.entity';
import { TodoModule } from './todo/todo.module';
import { Todo } from './todo/entities/Todo.entity';
import { PostFile } from './post/entities/postFile.entity';
import { ExamViewer } from './exam-viewer/entities/exam-viewer.entity';
import { ExamViewerModule } from './exam-viewer/exam-viewer.module';
import { StockModule } from './stock/stock.module';
import { Stock } from './stock/entities/stock.entity';
import { WeatherModule } from './weather/weather.module';
import { ChatbotModule } from './chatbot/chatbot.module';
import { ChatbotKey } from './chatbot/entities/chatbot-key.entity';
import { DiscountCodeModule } from './discount-code/discount-code.module';
import { DiscountCode } from './discount-code/discount-code.entity';
import { MockExamBookmarkModule } from './exam-bookmark/mock-exam-bookmark.module';
import { MockExamBookmark } from './exam-bookmark/entities/mock-exam-bookmark.entity';
import { ExamLikeModule } from './exam-like/exam-like.module';
import { ExamLike } from './exam-like/entities/exam-like.entity';
import { ExamCategoryBookmarkModule } from './exam-category-bookmark/exam-category-bookmark.module';
import { ExamCategoryBookmark } from './exam-category-bookmark/entities/exam-category-bookmark';
import { ExamCategoryInvitationModule } from './exam-category-invitation/exam-category-invitation.module';
import { ExamCategoryInvitation } from './exam-category-invitation/entities/exam-category-invitation.entity';
import { ExamCategoryModule } from './exam-category/exam-category.module';
import {
  ExamCategoryRole,
  MockExamCategory,
} from './exam-category/entities/mock-exam-category.entity';
import { SellerModule } from './seller/seller.module';
import { Seller } from './seller/entities/seller.entity';
import { CategoryEvaluationModule } from './category-evaluation/category-evaluation.module';
import { CategoryEvaluation } from './category-evaluation/entities/category-evaluation.entity';
import { DashBoardModule } from './dash-board/dash-board.module';
import { QuizModule } from './quiz/quiz.module';
import { Quiz } from './quiz/entities/quiz.entity';
import { QuizComment } from './quiz/entities/quizComment.entity';
import { QuizCommentLike } from './quiz/entities/quizCommentLike.entity';
import { NaverBlog } from './blogManage/entities/naver-blog.entity';
import { CategoryInvitationLink } from './category-invitation-link/entities/category-invitation-link.entity';
import { CategoryInvitationLinkModule } from './category-invitation-link/category-invitation-link.module';
import { SecedersModule } from './seceders/seceders.module';
import { Seceders } from './seceders/entities/seceders.entity';
import { PointBalance } from './point/entities/point-balance.entity';
import { PointTransaction } from './point/entities/point-transaction.entity';
import { PointModule } from './point/point.module';
import { RevenueRequestForm } from './revenue-request-form/entites/revenue-request-form.entity';
import { RevenueRequestFormModule } from './revenue-request-form/revenue-request-form.module';
import { CategoryPointHistory } from './point/entities/category-point-history.entity';
import { SettlementRequest } from './point/entities/settlement-request.entity';
import { MockExamQuestionBookmarkFolder } from './exam/entities/mock-exam-question-bookmark-folder.entity';
import { TextHighlightModule } from './text-highlight/text-highlight.module';
import { TextHighlight } from './text-highlight/entites/text-highlight.entity';
import { CoupangModule } from './modu-shop/coupang/coupang.module';
import { Product } from './modu-shop/coupang/entities/product.entity';
import { CoupangSearchLog } from './modu-shop/coupang/entities/coupang-search-log';

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
        TELEGRAM_EHSMASTER_REPORT_CHANNEL: Joi.string().required(),
      }),
    }),
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
      sortSchema: true, //default: false
      debug: process.env.NODE_ENV === 'dev',
      playground: process.env.NODE_ENV === 'dev',
      formatError(error) {
        logger.error(
          `GraphQL Validation Error: ${JSON.stringify(error, null, 2)}`,
        );
        return error;
      },
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
            ? [
                process.env.CLIENT_URL,
                process.env.ADMIN_URL,
                process.env.PRIVATE_URL,
              ]
            : [
                process.env.CLIENT_URL,
                process.env.NAVER_CRAWLER_BOT_URL,
                process.env.PRIVATE_URL,
              ],
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
        CoupangSearchLog,
        Product,
        NaverBlog,
        ExamCoAuthor,
        QuestionCard,
        QuestionCardCategory,
        DiscountCode,
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
        ZepUser,
        ZepStudyTime,
        Payment,
        UserAndRole,
        Role,
        Attendance,
        ZepMapUserCount,
        Video,
        ExamCategoryRole,
        Partner,
        ZepPost,
        ZepComment,
        Todo,
        PostFile,
        ExamViewer,
        Stock,
        ChatbotKey,
        MockExamBookmark,
        ExamLike,
        ExamCategoryBookmark,
        ExamCategoryInvitation,
        Seller,
        CategoryEvaluation,
        Quiz,
        QuizComment,
        QuizCommentLike,
        CategoryInvitationLink,
        Seceders,
        PointTransaction,
        PointBalance,
        RevenueRequestForm,
        CategoryPointHistory,
        SettlementRequest,
        MockExamQuestionBookmarkFolder,
        TextHighlight,
      ],
    }),
    UserModule,
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY,
    }),
    TelegramModule.forRoot({
      token: process.env.TELEGRAM_BOT_TOKEN,
      alramChannelId: Number(process.env.TELEGRAM_ALRAM_CHANNEL),
      ehsMasterReportChannelId: Number(
        process.env.TELEGRAM_EHSMASTER_REPORT_CHANNEL,
      ),
    }),
    RevalidateModule.forRoot({
      revalidateKey: process.env.REVALIDATE_KEY,
      clientUrl:
        process.env.NODE_ENV === 'dev'
          ? process.env.CLIENT_URL
          : process.env.PRODUCT_CLIENT_URL,
    }),
    DashBoardModule,
    AuthModule,
    ExamCoAuthorModule,
    MockExamsModule,
    UploadsModule,
    SchedulerModule,
    MailModule,
    RootModule,
    VisitModule,
    RevenueRequestFormModule,
    CategoryInvitationLinkModule,
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
    BlogManageModule,
    PostModule,
    CommonModule,
    QuestionCardModule,
    ExamCoAuthorModule,
    ZepModule,
    PaymentsModule,
    AttendanceModule,
    VideoModule,
    PartnersModule,
    TodoModule,
    ExamViewerModule,
    StockModule,
    WeatherModule,
    ChatbotModule,
    DiscountCodeModule,
    MockExamBookmarkModule,
    ExamLikeModule,
    ExamCategoryBookmarkModule,
    ExamCategoryInvitationModule,
    ExamCategoryModule,
    SellerModule,
    CategoryEvaluationModule,
    QuizModule,
    SecedersModule,
    PointModule,
    TextHighlightModule,
    CoupangModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
