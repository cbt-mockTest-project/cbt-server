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
exports.UserService = void 0;
const notice_service_1 = require("./notice.service");
const telegram_service_1 = require("./../telegram/telegram.service");
const uuid_1 = require("uuid");
const jwt_service_1 = require("../jwt/jwt.service");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const verification_entity_1 = require("./entities/verification.entity");
const mail_service_1 = require("../mail/mail.service");
const bcrypt = require("bcrypt");
const feedback_entity_1 = require("./entities/feedback.entity");
let UserService = class UserService {
    constructor(users, verification, feedback, mailService, jwtService, telegramService, noticeService) {
        this.users = users;
        this.verification = verification;
        this.feedback = feedback;
        this.mailService = mailService;
        this.jwtService = jwtService;
        this.telegramService = telegramService;
        this.noticeService = noticeService;
    }
    async register(registerInput) {
        try {
            const { code, password, nickname } = registerInput;
            const { email } = await this.verification.findOne({ where: { code } });
            if (!email) {
                return {
                    ok: false,
                    error: '인증되지 않은 이메일입니다.',
                };
            }
            const exists = await this.users.findOne({
                where: { email },
                withDeleted: true,
            });
            if (exists && exists.deletedAt) {
                return {
                    ok: false,
                    error: '탈퇴 처리된 회원입니다.',
                };
            }
            if (exists) {
                return {
                    ok: false,
                    error: '이미 가입된 이메일입니다.',
                };
            }
            if (nickname.length >= 10) {
                return {
                    ok: false,
                    error: '닉네임은 10글자를 초과할 수 없습니다.',
                };
            }
            await this.users.save(this.users.create({ email, password, nickname, role: user_entity_1.UserRole.CLIENT }));
            await this.verification.delete({ email });
            this.telegramService.sendMessageToAlramChannelOfTelegram({
                message: `${nickname} 님이 회원가입 하셨습니다. `,
            });
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '회원가입에 실패했습니다.',
            };
        }
    }
    async sendVerificationMail(sendVerificationInput) {
        try {
            const code = (0, uuid_1.v4)();
            const { email } = sendVerificationInput;
            const user = await this.users.findOne({
                where: { email },
                withDeleted: true,
            });
            if (user && user.deletedAt) {
                return {
                    ok: false,
                    error: '탈퇴 처리된 이메일입니다.',
                };
            }
            if (user) {
                return {
                    ok: false,
                    error: '이미 가입된 이메일입니다.',
                };
            }
            const newVerification = this.verification.create({ email, code });
            const prevVerification = await this.verification.findOne({
                where: { email },
            });
            if (prevVerification) {
                await this.verification.update(prevVerification.id, { code });
            }
            else {
                await this.verification.save(newVerification);
            }
            this.mailService.sendVerificationEmail(email, `${process.env.CLIENT_URL}/register?code=${code}`);
            return {
                ok: true,
            };
        }
        catch (e) {
            return {
                ok: false,
                error: '메일을 보낼 수 없습니다.',
            };
        }
    }
    async sendFindPasswordMail(sendFindPasswordMailInput) {
        try {
            const code = (0, uuid_1.v4)();
            const { email } = sendFindPasswordMailInput;
            const user = await this.users.findOne({
                where: { email },
                withDeleted: true,
            });
            if (user && user.deletedAt) {
                return {
                    ok: false,
                    error: '탈퇴 처리된 이메일입니다.',
                };
            }
            if (!user) {
                return {
                    ok: false,
                    error: '존재하지 않는 이메일입니다.',
                };
            }
            const newVerification = this.verification.create({ email, code });
            const prevVerification = await this.verification.findOne({
                where: { email },
            });
            if (prevVerification) {
                await this.verification.update(prevVerification.id, { code });
            }
            else {
                await this.verification.save(newVerification);
            }
            this.mailService.sendFindPasswordEmail(email, `${process.env.CLIENT_URL}/register/password?key=${code}`);
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '메일을 보낼 수 없습니다.',
            };
        }
    }
    async emailVerification(emailVerificationInput) {
        try {
            const { code } = emailVerificationInput;
            const verification = await this.verification.findOne({
                where: {
                    code,
                },
            });
            if (!verification) {
                return {
                    ok: false,
                    error: '존재하지 않는 인증입니다.',
                };
            }
            return {
                ok: true,
                email: verification.email,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '이메일 인증에 실패했습니다.',
            };
        }
    }
    async userProfile(userProfileInput) {
        try {
            const { id } = userProfileInput;
            const user = await this.users.findOne({
                where: {
                    id,
                },
            });
            if (!user) {
                return {
                    ok: false,
                    error: '존재하지 않는 유저입니다.',
                };
            }
            return {
                user,
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '유저를 찾을 수 없습니다.',
            };
        }
    }
    async login(loginInput, res) {
        try {
            const { email, password } = loginInput;
            const user = await this.users.findOne({
                where: { email },
                select: ['id', 'password', 'deletedAt'],
                withDeleted: true,
            });
            if (user && user.deletedAt) {
                return {
                    ok: false,
                    error: '탈퇴 처리된 이메일입니다.',
                };
            }
            if (!user) {
                return {
                    ok: false,
                    error: '등록되지 않은 이메일입니다.',
                };
            }
            const passwordCorrect = await user.checkPassword(password);
            if (!passwordCorrect) {
                return {
                    ok: false,
                    error: '비밀번호를 잘못 입력했습니다.',
                };
            }
            const token = this.jwtService.sign(user.id);
            res.cookie('jwt-token', token, {
                domain: process.env.DOMAIN,
                path: '/',
                sameSite: 'none',
                secure: true,
                httpOnly: true,
            });
            return {
                ok: true,
                token,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '로그인을 할 수 없습니다.',
            };
        }
    }
    async logout(res) {
        res.clearCookie('jwt-token', {
            domain: process.env.DOMAIN,
            path: '/',
            sameSite: 'none',
            secure: true,
            httpOnly: true,
        });
        return {
            ok: true,
        };
    }
    async me(user) {
        const { notices } = await this.noticeService.readMyNotice(user);
        if (user && notices) {
            return {
                ok: true,
                user,
                notices,
            };
        }
        return {
            ok: false,
            user: null,
            error: '로그인 상태가 아닙니다.',
        };
    }
    async checkPassword(checkPassWordInput, user) {
        try {
            const currentUser = await this.users.findOne({
                where: { id: user.id },
                select: { password: true },
            });
            const { password } = checkPassWordInput;
            const passwordCorrect = await currentUser.checkPassword(password);
            if (!passwordCorrect) {
                return {
                    ok: false,
                    error: '비밀번호를 잘못 입력했습니다.',
                };
            }
            return { ok: true };
        }
        catch (_a) {
            return {
                ok: false,
                error: '비밀번호 체크에 실패했습니다.',
            };
        }
    }
    async editProfile(editProfileInput, user) {
        const { nickname, password } = editProfileInput;
        try {
            const currentUser = await this.users.findOne({
                where: { id: user.id },
                select: { password: true },
            });
            const isEqualToPrevPassword = password && (await bcrypt.compare(password, currentUser.password));
            if (isEqualToPrevPassword) {
                return {
                    ok: false,
                    error: '이전과 비밀번호가 동일합니다.',
                };
            }
            if (nickname.length >= 10) {
                return {
                    ok: false,
                    error: '닉네임은 10글자를 초과할 수 없습니다.',
                };
            }
            user.password = password;
            user.nickname = nickname;
            await this.users.save(user);
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '프로필 수정에 실패했습니다.',
            };
        }
    }
    async deleteUser(user) {
        try {
            this.users.softDelete({ id: user.id });
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '회원탈퇴에 실패했습니다.',
            };
        }
    }
    async restoreUser(restoreUserInput) {
        try {
            const { id } = restoreUserInput;
            await this.users.restore({ id });
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '탈퇴 복구에 실패했습니다.',
            };
        }
    }
    async changePasswordAfterVerifying(changePasswordAfterVerifyingInput) {
        try {
            const { code, password } = changePasswordAfterVerifyingInput;
            const { email } = await this.verification.findOne({ where: { code } });
            if (!email) {
                return {
                    ok: false,
                    error: '인증되지 않은 이메일입니다.',
                };
            }
            const user = await this.users.findOne({
                where: { email },
            });
            if (!user) {
                return {
                    ok: false,
                    error: '존재하지 않는 이메일입니다.',
                };
            }
            user.password = password;
            await this.users.save(user);
            await this.verification.delete({ email });
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '비밀번호 변경에 실패했습니다.',
            };
        }
    }
    async createFeedback(createFeedback, user) {
        try {
            const { content } = createFeedback;
            if (!content) {
                return {
                    ok: false,
                    error: '한글자 이상 입력해주세요.',
                };
            }
            const newFeedback = this.feedback.create({ content, user });
            this.feedback.save(newFeedback);
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '피드백을 보낼 수 없습니다.',
            };
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(verification_entity_1.Verification)),
    __param(2, (0, typeorm_1.InjectRepository)(feedback_entity_1.Feedback)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        mail_service_1.MailService,
        jwt_service_1.JwtService,
        telegram_service_1.TelegramService,
        notice_service_1.NoticeService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map