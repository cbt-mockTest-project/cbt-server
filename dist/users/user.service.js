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
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const axios_1 = require("axios");
const bcrypt = require("bcrypt");
const jwt_service_1 = require("../jwt/jwt.service");
const mail_service_1 = require("../mail/mail.service");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const telegram_service_1 = require("./../telegram/telegram.service");
const feedback_entity_1 = require("./entities/feedback.entity");
const user_entity_1 = require("./entities/user.entity");
const verification_entity_1 = require("./entities/verification.entity");
const notice_service_1 = require("./notice.service");
const payment_service_1 = require("../payments/payment.service");
const userAndRole_entity_1 = require("./entities/userAndRole.entity");
const role_entity_1 = require("./entities/role.entity");
const momentTimezone = require("moment-timezone");
let UserService = class UserService {
    constructor(users, verification, feedback, userAndRole, role, mailService, jwtService, telegramService, noticeService, paymentService) {
        this.users = users;
        this.verification = verification;
        this.feedback = feedback;
        this.userAndRole = userAndRole;
        this.role = role;
        this.mailService = mailService;
        this.jwtService = jwtService;
        this.telegramService = telegramService;
        this.noticeService = noticeService;
        this.paymentService = paymentService;
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
            if (password && password.length < 4) {
                return {
                    ok: false,
                    error: '비밀번호를 4글자 이상 입력해주세요.',
                };
            }
            if (nickname && nickname.length >= 10) {
                return {
                    ok: false,
                    error: '닉네임은 10글자를 초과할 수 없습니다.',
                };
            }
            const user = await this.users.save(this.users.create({ email, password, nickname, role: user_entity_1.UserRole.CLIENT }));
            await this.verification.delete({ email });
            this.telegramService.sendMessageToAlramChannelOfTelegram({
                message: `${nickname} 님이 회원가입 하셨습니다. `,
            });
            await this.noticeService.createNotice({
                userId: user.id,
                content: '모두CBT 가입을 환영합니다 !',
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
                relations: {
                    userRoles: {
                        role: true,
                    },
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
                maxAge: 30 * 24 * 60 * 60 * 1000,
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
                select: { password: true, nickname: true },
            });
            const isEqualToPrevPassword = password && (await bcrypt.compare(password, currentUser.password));
            if (password && password.length < 4) {
                return {
                    ok: false,
                    error: '비밀번호를 4글자 이상 입력해주세요.',
                };
            }
            if (isEqualToPrevPassword) {
                return {
                    ok: false,
                    error: '이전과 비밀번호가 동일합니다.',
                };
            }
            if (nickname) {
                if (nickname.length < 2) {
                    return { ok: false, error: '닉네임을 2글자 이상 입력해주세요.' };
                }
                if (nickname.length >= 10) {
                    return {
                        ok: false,
                        error: '닉네임은 10글자를 초과할 수 없습니다.',
                    };
                }
                if (currentUser.nickname === nickname) {
                    return {
                        ok: false,
                        error: '이전과 닉네임이 동일합니다.',
                    };
                }
                const existed = await this.users.findOne({
                    where: { nickname },
                });
                if (existed) {
                    return {
                        ok: false,
                        error: '중복된 닉네임이 존재합니다.',
                    };
                }
            }
            user.password = password;
            user.nickname = nickname;
            await this.users.save(user);
            return {
                ok: true,
            };
        }
        catch (e) {
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
            if (password && password.length < 4) {
                return {
                    ok: false,
                    error: '비밀번호를 4글자 이상 입력해주세요.',
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
    async kakaoLogin(kakaoLoginInput, res) {
        const { code } = kakaoLoginInput;
        const resToToken = await axios_1.default.post('https://kauth.kakao.com/oauth/token', {
            grant_type: 'authorization_code',
            client_id: process.env.KAKAO_REST_API_KEY,
            redirect_uri: process.env.REDIRECT_URI + '/kakao',
            code,
        }, {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        });
        if (!resToToken.data) {
            return {
                ok: false,
                error: '로그인 에러',
            };
        }
        const resToUserInfo = await axios_1.default.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                Authorization: `Bearer ${resToToken.data.access_token}`,
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        });
        if (!resToUserInfo.data) {
            return {
                ok: false,
                error: '유저정보를 가져올 수 없습니다.',
            };
        }
        const { kakao_account: { email, profile }, } = resToUserInfo.data;
        const user = await this.users.findOne({
            where: { email },
            withDeleted: true,
        });
        if (user && user.deletedAt) {
            return {
                ok: false,
                error: '탈퇴 처리된 계정입니다.',
            };
        }
        let newUser;
        let token;
        const existedNickname = await this.users.findOne({
            where: { nickname: profile.nickname },
        });
        if (existedNickname) {
            profile.nickname = profile.nickname + '#' + (0, uuid_1.v4)().substring(0, 4);
        }
        if (!user) {
            newUser = this.users.create({
                email,
                nickname: profile.nickname,
                role: user_entity_1.UserRole.CLIENT,
                LoginType: user_entity_1.LoginType.KAKAO,
            });
            newUser = await this.users.save(newUser);
            this.telegramService.sendMessageToAlramChannelOfTelegram({
                message: `${newUser.nickname} 님이 회원가입 하셨습니다. `,
            });
            token = this.jwtService.sign(newUser.id);
        }
        else {
            token = this.jwtService.sign(user.id);
        }
        if (user && user.LoginType !== user_entity_1.LoginType.KAKAO) {
            return {
                ok: false,
                error: '이미 가입된 이메일입니다.',
            };
        }
        res.cookie('jwt-token', token, {
            domain: process.env.DOMAIN,
            path: '/',
            sameSite: 'none',
            secure: true,
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        return {
            ok: true,
            token,
        };
    }
    async googleLogin(kakaoLoginInput, res) {
        const { code } = kakaoLoginInput;
        const resToToken = await axios_1.default.post(`https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_SECRET_KEY}&redirect_uri=${process.env.REDIRECT_URI}/google&grant_type=authorization_code`, {}, {
            headers: {
                'content-type': 'x-www-form-urlencoded',
            },
        });
        if (!resToToken.data) {
            return {
                ok: false,
                error: '로그인 에러',
            };
        }
        const resToUserInfo = await axios_1.default.get('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                Authorization: `Bearer ${resToToken.data.access_token}`,
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        });
        if (!resToUserInfo.data) {
            return {
                ok: false,
                error: '유저정보를 가져올 수 없습니다.',
            };
        }
        let { email, name } = resToUserInfo.data;
        const user = await this.users.findOne({
            where: { email },
            withDeleted: true,
        });
        if (user && user.deletedAt) {
            return {
                ok: false,
                error: '탈퇴 처리된 계정입니다.',
            };
        }
        const existedNickname = await this.users.findOne({
            where: { nickname: name },
        });
        if (existedNickname) {
            name = name + '#' + (0, uuid_1.v4)().substring(0, 4);
        }
        let newUser;
        let token;
        if (!user) {
            newUser = this.users.create({
                email,
                nickname: name,
                role: user_entity_1.UserRole.CLIENT,
                LoginType: user_entity_1.LoginType.GOOGLE,
            });
            newUser = await this.users.save(newUser);
            this.telegramService.sendMessageToAlramChannelOfTelegram({
                message: `${newUser.nickname} 님이 회원가입 하셨습니다. `,
            });
            token = this.jwtService.sign(newUser.id);
        }
        else {
            token = this.jwtService.sign(user.id);
        }
        if (user && user.LoginType !== user_entity_1.LoginType.GOOGLE) {
            return {
                ok: false,
                error: '이미 가입된 이메일입니다.',
            };
        }
        res.cookie('jwt-token', token, {
            domain: process.env.DOMAIN,
            path: '/',
            sameSite: 'none',
            secure: true,
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        return {
            ok: true,
            token,
        };
    }
    async searchUser(searchUserInput) {
        try {
            const { name } = searchUserInput;
            const users = await this.users.find({
                where: [
                    {
                        nickname: (0, typeorm_2.Like)(`%${name}%`),
                    },
                    { email: (0, typeorm_2.Like)(`%${name}%`) },
                ],
                relations: {
                    userRoles: {
                        role: true,
                    },
                },
            });
            return {
                ok: true,
                users,
            };
        }
        catch (error) {
            return {
                ok: false,
                error: error.message,
            };
        }
    }
    async updateAdBlockPermission(updateAdBlockPermission) {
        const { userId } = updateAdBlockPermission;
        try {
            const user = await this.users.findOne({ where: { id: userId } });
            if (!user) {
                return {
                    ok: false,
                    error: '유저를 찾을 수 없습니다.',
                };
            }
            user.isAllowAdblock = !user.isAllowAdblock;
            const { isAllowAdblock } = await this.users.save(user);
            return {
                ok: true,
                adblockPermission: isAllowAdblock,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '광고차단 설정을 변경할 수 없습니다.',
            };
        }
    }
    async checkUserRole(checkUserRoleInput, user) {
        try {
            const { roleIds } = checkUserRoleInput;
            const userRoles = await this.userAndRole.find({
                where: {
                    user: {
                        id: user.id,
                    },
                },
            });
            const userRoleIds = userRoles.map((userRole) => userRole.role.id);
            if (userRoleIds.some((userRoleId) => roleIds.includes(userRoleId))) {
                return {
                    ok: true,
                    confirmed: true,
                };
            }
            else {
                return {
                    ok: true,
                    confirmed: false,
                };
            }
        }
        catch (_a) {
            return {
                ok: false,
                confirmed: false,
                error: '권한을 확인할 수 없습니다.',
            };
        }
    }
    async changeClientRole(changeClientRoleInput, user, queryRunner) {
        try {
            const { role } = changeClientRoleInput;
            const protectedRoleList = [user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.PARTNER];
            if (protectedRoleList.includes(role)) {
                return {
                    ok: false,
                    error: '변경할 수 없는 권한입니다.',
                };
            }
            const client = await this.users.findOne({ where: { id: user.id } });
            if (!client) {
                return {
                    ok: false,
                    error: '유저를 찾을 수 없습니다.',
                };
            }
            client.role = role;
            if (queryRunner) {
                await queryRunner.manager.save(client);
            }
            else {
                await this.users.save(client);
            }
            return {
                ok: true,
            };
        }
        catch (_a) {
            if (queryRunner) {
                await queryRunner.rollbackTransaction();
            }
            return {
                ok: false,
                error: '권한을 변경할 수 없습니다.',
            };
        }
    }
    async changeClientRoleAndCreatePayment(user, changeClientRoleAndCreatePaymentInput) {
        const queryRunner = this.users.manager.connection.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            const { changeClientRoleInput, createPaymentInput } = changeClientRoleAndCreatePaymentInput;
            await this.changeClientRole(changeClientRoleInput, user, queryRunner);
            const createPaymentResponse = await this.paymentService.createPayment(createPaymentInput, user, queryRunner);
            await queryRunner.commitTransaction();
            return {
                ok: true,
                paymentId: createPaymentResponse.payment.id,
            };
        }
        catch (e) {
            await queryRunner.rollbackTransaction();
            return {
                ok: false,
                error: '권한 변경 및 결제에 실패했습니다.',
            };
        }
        finally {
            await queryRunner.release();
        }
    }
    async createUserRole(createUserRoleInput) {
        const { userId, roleId } = createUserRoleInput;
        try {
            const user = await this.users.findOne({ where: { id: userId } });
            const role = await this.role.findOne({ where: { id: roleId } });
            if (!user) {
                return {
                    ok: false,
                    error: '유저를 찾을 수 없습니다.',
                };
            }
            if (!role) {
                return {
                    ok: false,
                    error: '권한을 찾을 수 없습니다.',
                };
            }
            const existedRole = await this.userAndRole.findOne({
                where: {
                    user: {
                        id: userId,
                    },
                    role: {
                        id: roleId,
                    },
                },
            });
            if (existedRole) {
                return {
                    ok: false,
                    error: '이미 부여된 권한입니다.',
                };
            }
            const userRole = await this.userAndRole.save(this.userAndRole.create({
                user,
                role,
            }));
            return {
                ok: true,
                roleId: userRole.id,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '권한을 변경할 수 없습니다.',
            };
        }
    }
    async createFreeTrialRole(user) {
        if (user.usedFreeTrial) {
            return {
                ok: false,
                error: '무료체험은 1회만 가능합니다.',
            };
        }
        const queryRunner = this.users.manager.connection.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            const newUserAndRole = this.userAndRole.create({
                user: {
                    id: user.id,
                },
                role: {
                    id: 3,
                },
            });
            const newUser = this.users.create({
                id: user.id,
                usedFreeTrial: true,
            });
            await queryRunner.manager.save(newUserAndRole);
            await queryRunner.manager.save(newUser);
            await queryRunner.commitTransaction();
            return {
                ok: true,
            };
        }
        catch (_a) {
            await queryRunner.rollbackTransaction();
            return {
                ok: false,
                error: '무료체험 등록에 실패했습니다.',
            };
        }
        finally {
            await queryRunner.release();
        }
    }
    async deleteUserRole(deleteUserRoleInput) {
        const { id } = deleteUserRoleInput;
        try {
            await this.userAndRole.delete({ id });
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '권한을 삭제할 수 없습니다.',
            };
        }
    }
    async clearFreeTrialRole() {
        const userAndRoles = await this.userAndRole.find({
            where: {
                role: {
                    id: 3,
                },
            },
        });
        const filteredUserAndRoles = userAndRoles.filter((userAndRole) => {
            const { created_at } = userAndRole;
            const differenceInHours = momentTimezone(new Date()).diff(momentTimezone(created_at), 'hours');
            return differenceInHours > 24 + 9;
        });
        try {
            await this.userAndRole.remove(filteredUserAndRoles);
            return {
                ok: true,
                count: filteredUserAndRoles.length,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '무료체험 권한 삭제에 실패했습니다.',
            };
        }
    }
    async getRoleCount(getRoleCountInput) {
        const { roleId } = getRoleCountInput;
        try {
            const roles = await this.userAndRole.find({
                where: {
                    role: {
                        id: roleId,
                    },
                },
            });
            return {
                ok: true,
                count: roles.length,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '권한을 확인할 수 없습니다.',
            };
        }
    }
    async syncRole() {
        const users = await this.users.find({
            where: {
                isAllowAdblock: true,
            },
        });
        users.forEach(async (user) => {
            await this.userAndRole.save({
                user,
                role: {
                    id: 1,
                },
            });
        });
        return {
            ok: true,
        };
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(verification_entity_1.Verification)),
    __param(2, (0, typeorm_1.InjectRepository)(feedback_entity_1.Feedback)),
    __param(3, (0, typeorm_1.InjectRepository)(userAndRole_entity_1.UserAndRole)),
    __param(4, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        mail_service_1.MailService,
        jwt_service_1.JwtService,
        telegram_service_1.TelegramService,
        notice_service_1.NoticeService,
        payment_service_1.PaymentService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map