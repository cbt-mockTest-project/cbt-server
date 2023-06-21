"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCommentSerivce = void 0;
const post_entity_1 = require("./entities/post.entity");
const postComment_entity_1 = require("./entities/postComment.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const common_constants_1 = require("../common/common.constants");
const notice_service_1 = require("../users/notice.service");
const mail_service_1 = require("../mail/mail.service");
const utils_1 = require("../utils/utils");
let PostCommentSerivce = class PostCommentSerivce {
    constructor(mockExamQuestionComment, mockExamQuestion, pubSub, noticeService, mailService) {
        this.mockExamQuestionComment = mockExamQuestionComment;
        this.mockExamQuestion = mockExamQuestion;
        this.pubSub = pubSub;
        this.noticeService = noticeService;
        this.mailService = mailService;
    }
    async createPostComment(createPostCommentInput, user) {
        try {
            const { postId, content } = createPostCommentInput;
            const post = await this.mockExamQuestion.findOne({
                where: { id: postId },
                relations: { user: true },
            });
            if (!post) {
                return {
                    ok: false,
                    error: '존재하지 않는 게시글입니다.',
                };
            }
            const comment = this.mockExamQuestionComment.create({
                content,
                post,
                user,
            });
            await this.mockExamQuestionComment.save(comment);
            const noticeContent = `${post.title.substring(0, 5)}...게시글에 새로운 댓글이 달렸습니다.`;
            this.noticeService.createNotice({
                userId: post.user.id,
                content: noticeContent,
                link: `/post/${post.id}`,
            });
            this.mailService.sendCommentNoticeEmail((0, utils_1.ellipsisText)(post.title, 10) + ' 게시글에 댓글이 달렸습니다.', post.user.email, `https://moducbt.com/post/${post.id}`, (0, utils_1.ellipsisText)(post.title, 10));
            return {
                comment,
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '댓글을 작성할 수 없습니다.',
            };
        }
    }
    async editPostComment(editPostCommentInput, user) {
        try {
            const { id, content } = editPostCommentInput;
            const prevComment = await this.mockExamQuestionComment.findOne({
                where: {
                    id,
                    user: {
                        id: user.id,
                    },
                },
            });
            if (!prevComment) {
                return {
                    ok: false,
                    error: '존재하지 않는 댓글입니다.',
                };
            }
            prevComment.content = content;
            await this.mockExamQuestionComment.save([prevComment]);
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '댓글을 수정할 수 없습니다.',
            };
        }
    }
    async deletePostComment(deletePostCommentInput, user) {
        try {
            const { id } = deletePostCommentInput;
            const Comment = await this.mockExamQuestionComment.findOne({
                where: {
                    id,
                    user: {
                        id: user.id,
                    },
                },
            });
            if (!Comment) {
                return {
                    ok: false,
                    error: '존재하지 않는 댓글입니다.',
                };
            }
            this.mockExamQuestionComment.delete({ id });
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '댓글을 삭제 할 수 없습니다.',
            };
        }
    }
};
PostCommentSerivce = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(postComment_entity_1.PostComment)),
    __param(1, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __param(2, (0, common_1.Inject)(common_constants_1.PUB_SUB)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        graphql_subscriptions_1.PubSub,
        notice_service_1.NoticeService,
        mail_service_1.MailService])
], PostCommentSerivce);
exports.PostCommentSerivce = PostCommentSerivce;
//# sourceMappingURL=postComment.service.js.map