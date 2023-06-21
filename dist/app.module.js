"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const apollo_1 = require("@nestjs/apollo");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const graphql_1 = require("@nestjs/graphql");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const Joi = require("joi");
const path_1 = require("path");
const auth_module_1 = require("./auth/auth.module");
const common_module_1 = require("./common/common.module");
const crawler_module_1 = require("./crawler/crawler.module");
const exam_co_author_entity_1 = require("./exam-co-author/entities/exam-co-author.entity");
const exam_co_author_module_1 = require("./exam-co-author/exam-co-author.module");
const jwt_module_1 = require("./jwt/jwt.module");
const logger_1 = require("./lib/logger");
const logging_interceptor_1 = require("./logging.interceptor");
const mail_module_1 = require("./mail/mail.module");
const mock_exam_category_entity_1 = require("./mock-exams/entities/mock-exam-category.entity");
const mock_exam_history_1 = require("./mock-exams/entities/mock-exam-history");
const mock_exam_question_bookmark_entity_1 = require("./mock-exams/entities/mock-exam-question-bookmark.entity");
const mock_exam_question_comment_like_entity_1 = require("./mock-exams/entities/mock-exam-question-comment-like.entity");
const mock_exam_question_comment_entity_1 = require("./mock-exams/entities/mock-exam-question-comment.entity");
const mock_exam_question_feedback_recommendation_entity_1 = require("./mock-exams/entities/mock-exam-question-feedback-recommendation.entity");
const mock_exam_question_feedback_entity_1 = require("./mock-exams/entities/mock-exam-question-feedback.entity");
const mock_exam_question_multiple_choice_entity_1 = require("./mock-exams/entities/mock-exam-question-multiple-choice.entity");
const mock_exam_question_state_entity_1 = require("./mock-exams/entities/mock-exam-question-state.entity");
const mock_exam_question_entity_1 = require("./mock-exams/entities/mock-exam-question.entity");
const mock_exam_entity_1 = require("./mock-exams/entities/mock-exam.entity");
const mock_exams_module_1 = require("./mock-exams/mock-exams.module");
const post_entity_1 = require("./post/entities/post.entity");
const postComment_entity_1 = require("./post/entities/postComment.entity");
const postCommentLike_entity_1 = require("./post/entities/postCommentLike.entity");
const postLike_entity_1 = require("./post/entities/postLike.entity");
const post_module_1 = require("./post/post.module");
const question_card_category_1 = require("./question-card/entities/question-card-category");
const question_card_entity_1 = require("./question-card/entities/question-card.entity");
const question_card_module_1 = require("./question-card/question-card.module");
const revalidate_module_1 = require("./revalidate/revalidate.module");
const root_module_1 = require("./root/root.module");
const scheduler_module_1 = require("./scheduler/scheduler.module");
const telegram_module_1 = require("./telegram/telegram.module");
const uploads_module_1 = require("./uploads/uploads.module");
const feedback_entity_1 = require("./users/entities/feedback.entity");
const notice_entity_1 = require("./users/entities/notice.entity");
const user_entity_1 = require("./users/entities/user.entity");
const verification_entity_1 = require("./users/entities/verification.entity");
const user_module_1 = require("./users/user.module");
const visit_entity_1 = require("./visit/entities/visit.entity");
const visitHistory_entity_1 = require("./visit/entities/visitHistory.entity");
const visit_module_1 = require("./visit/visit.module");
const zep_module_1 = require("./zep/zep.module");
const zepUser_entity_1 = require("./zep/entities/zepUser.entity");
const zepStudyTime_entity_1 = require("./zep/entities/zepStudyTime.entity");
const payments_module_1 = require("./payments/payments.module");
const payment_entity_1 = require("./payments/entities/payment.entity");
const userAndRole_entity_1 = require("./users/entities/userAndRole.entity");
const role_entity_1 = require("./users/entities/role.entity");
const attendance_module_1 = require("./attendance/attendance.module");
const attendance_entity_1 = require("./attendance/entities/attendance.entity");
const zepMapUserCount_entity_1 = require("./zep/entities/zepMapUserCount.entity");
const video_module_1 = require("./video/video.module");
const video_entity_1 = require("./video/entities/video.entity");
const partners_module_1 = require("./partners/partners.module");
const partners_entity_1 = require("./partners/entities/partners.entity");
const zepComment_entity_1 = require("./zep/entities/zepComment.entity");
const zepPost_entity_1 = require("./zep/entities/zepPost.entity");
const chat_entity_1 = require("./chat/entities/chat.entity");
const todo_module_1 = require("./todo/todo.module");
const Todo_entity_1 = require("./todo/entities/Todo.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
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
            schedule_1.ScheduleModule.forRoot(),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                installSubscriptionHandlers: true,
                autoSchemaFile: true,
                sortSchema: true,
                formatError(error) {
                    logger_1.default.error(`GraphQL Validation Error: ${JSON.stringify(error, null, 2)}`);
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
                    origin: process.env.NODE_ENV == 'dev'
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
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: +process.env.DB_PORT,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                synchronize: process.env.NODE_ENV !== 'prod',
                logging: false,
                entities: [
                    exam_co_author_entity_1.ExamCoAuthor,
                    question_card_entity_1.QuestionCard,
                    question_card_category_1.QuestionCardCategory,
                    user_entity_1.User,
                    verification_entity_1.Verification,
                    mock_exam_entity_1.MockExam,
                    mock_exam_history_1.MockExamHistory,
                    mock_exam_category_entity_1.MockExamCategory,
                    mock_exam_question_entity_1.MockExamQuestion,
                    mock_exam_question_feedback_entity_1.MockExamQuestionFeedback,
                    mock_exam_question_state_entity_1.MockExamQuestionState,
                    feedback_entity_1.Feedback,
                    mock_exam_question_comment_entity_1.MockExamQuestionComment,
                    mock_exam_question_comment_like_entity_1.MockExamQuestionCommentLike,
                    mock_exam_question_bookmark_entity_1.MockExamQuestionBookmark,
                    mock_exam_question_multiple_choice_entity_1.MockExamQuestionMultipleChoice,
                    mock_exam_question_feedback_recommendation_entity_1.MockExamQuestionFeedbackRecommendation,
                    notice_entity_1.Notice,
                    post_entity_1.Post,
                    postComment_entity_1.PostComment,
                    postCommentLike_entity_1.PostCommentLike,
                    postLike_entity_1.PostLike,
                    visit_entity_1.Visit,
                    visitHistory_entity_1.VisitHistory,
                    zepUser_entity_1.ZepUser,
                    zepStudyTime_entity_1.ZepStudyTime,
                    payment_entity_1.Payment,
                    userAndRole_entity_1.UserAndRole,
                    role_entity_1.Role,
                    attendance_entity_1.Attendance,
                    zepMapUserCount_entity_1.ZepMapUserCount,
                    video_entity_1.Video,
                    mock_exam_category_entity_1.ExamCategoryRole,
                    partners_entity_1.Partner,
                    zepPost_entity_1.ZepPost,
                    zepComment_entity_1.ZepComment,
                    chat_entity_1.Chat,
                    Todo_entity_1.Todo,
                ],
            }),
            user_module_1.UserModule,
            jwt_module_1.JwtModule.forRoot({
                privateKey: process.env.PRIVATE_KEY,
            }),
            telegram_module_1.TelegramModule.forRoot({
                token: process.env.TELEGRAM_BOT_TOKEN,
                alramChannelId: Number(process.env.TELEGRAM_ALRAM_CHANNEL),
            }),
            revalidate_module_1.RevalidateModule.forRoot({
                revalidateKey: process.env.REVALIDATE_KEY,
                clientUrl: process.env.NODE_ENV === 'dev'
                    ? process.env.CLIENT_URL
                    : process.env.PRODUCT_CLIENT_URL,
            }),
            auth_module_1.AuthModule,
            exam_co_author_module_1.ExamCoAuthorModule,
            mock_exams_module_1.MockExamsModule,
            uploads_module_1.UploadsModule,
            scheduler_module_1.SchedulerModule,
            mail_module_1.MailModule,
            root_module_1.RootModule,
            visit_module_1.VisitModule,
            mailer_1.MailerModule.forRoot({
                transport: `smtps://${process.env.EMAIL_AUTH_EMAIL}:${process.env.EMAIL_AUTH_PASSWORD}@${process.env.EMAIL_HOST}`,
                defaults: {
                    from: `"${process.env.EMAIL_FROM_USER_NAME}" <${process.env.EMAIL_AUTH_EMAIL}>`,
                },
                preview: false,
                template: {
                    dir: (0, path_1.join)(__dirname, 'templates'),
                    adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            revalidate_module_1.RevalidateModule,
            telegram_module_1.TelegramModule,
            crawler_module_1.CrawlerModule,
            post_module_1.PostModule,
            common_module_1.CommonModule,
            question_card_module_1.QuestionCardModule,
            exam_co_author_module_1.ExamCoAuthorModule,
            zep_module_1.ZepModule,
            payments_module_1.PaymentsModule,
            attendance_module_1.AttendanceModule,
            video_module_1.VideoModule,
            partners_module_1.PartnersModule,
            todo_module_1.TodoModule,
        ],
        controllers: [],
        providers: [
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: logging_interceptor_1.LoggingInterceptor,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map