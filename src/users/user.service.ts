import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import * as bcrypt from 'bcrypt';
import { Response, Request } from 'express';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { JwtService } from 'src/jwt/jwt.service';
import { MailService } from 'src/mail/mail.service';
import { In, Like, QueryRunner, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { TelegramService } from './../telegram/telegram.service';
import {
  EmailVerificationInput,
  EmailVerificationOutput,
} from './dtos/EmailVerification.dto';
import {
  ChangePasswordAfterVerifyingInput,
  ChangePasswordAfterVerifyingOutput,
} from './dtos/changePasswordAfterVerifying.dto';
import {
  CheckPasswordInput,
  CheckPasswordOutput,
} from './dtos/checkPassword.dto';
import {
  CreateFeedbackInput,
  CreateFeedbackOutput,
} from './dtos/createFeedback.dto';
import { EditProfileInput, EditProfileOutput } from './dtos/editProfile.dto';
import { KakaoLoginOutput } from './dtos/kakaoLogin.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { MeOutput } from './dtos/me.dto';
import { RegisterInput, RegisterOutput } from './dtos/register.dto';
import { RestoreUserInput } from './dtos/restoreUser.dto';
import { SearchUserInput, SearchUserOutput } from './dtos/searchUser.dto';
import {
  SendFindPasswordMailInput,
  SendFindPasswordMailOutput,
} from './dtos/sendFindPasswordMail.dto';
import {
  SendVerificationMailInput,
  SendVerificationMailOutput,
} from './dtos/sendVerificationMail.dto';
import {
  UpdateAdblockPermissionInput,
  UpdateAdblockPermissionOutput,
} from './dtos/updateAdblockPermission.dto';
import { UserProfileInput, UserProfileOutput } from './dtos/userProfile.dto';
import { Feedback } from './entities/feedback.entity';
import { LoginType, User, UserRole } from './entities/user.entity';
import { Verification } from './entities/verification.entity';
import { NoticeService } from './notice.service';
import {
  CheckUserRoleInput,
  CheckUserRoleOutput,
} from './dtos/checkUserRole.dto';
import { ChangeClientRoleInput } from './dtos/changeClientRole.dto';
import {
  ChangeClientRoleAndCreatePaymentInput,
  ChangeClientRoleAndCreatePaymentOutput,
} from './dtos/changeClientRoleAndCreatePayment.dto';
import { PaymentService } from 'src/payments/payment.service';
import { UserAndRole } from './entities/userAndRole.entity';
import { Role } from './entities/role.entity';
import {
  CreateUserRoleInput,
  CreateUserRoleOutput,
} from './dtos/createUserRole.dto';
import {
  DeleteUserRoleInput,
  DeleteUserRoleOutput,
} from './dtos/deleteUserRole.dto';
import { CreateFreeTrialRoleOutput } from './dtos/createFreeTrialRole.dto';
import * as momentTimezone from 'moment-timezone';
import { ClearFreeTrialRoleOutput } from './dtos/clearFreeTrialRole.dto';
import { GetRoleCountInput, GetRoleCountOutput } from './dtos/getRoleCount';
import {
  GetUserByNicknameOrEmailInput,
  GetUserByNicknameOrEmailOutput,
} from './dtos/getUserByNicknameOrEmail.dto';
import { GetRolesCountInput, GetRolesCountOutput } from './dtos/getRolesCount';
import {
  UpdateRecentlyStudiedCategoryInput,
  UpdateRecentlyStudiedCategoryOutput,
} from './dtos/updateRecentlyStudiedCategory.dto';
import { format } from 'date-fns';
import {
  UpsertRecentlyStudiedExamsInput,
  UpsertRecentlyStudiedExamsOutput,
} from './dtos/upsertRecentlyStudiedExams.dto';
import { SecedersService } from 'src/seceders/seceders.service';
import {
  GetPresignedUrlInput,
  GetPresignedUrlOutput,
} from './dtos/getPresignedUrl.dto';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Verification)
    private readonly verification: Repository<Verification>,
    @InjectRepository(Feedback)
    private readonly feedback: Repository<Feedback>,
    @InjectRepository(UserAndRole)
    private readonly userAndRole: Repository<UserAndRole>,
    @InjectRepository(Role)
    private readonly role: Repository<Role>,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly telegramService: TelegramService,
    private readonly noticeService: NoticeService,
    private readonly paymentService: PaymentService,
    private readonly secedersService: SecedersService,
  ) {}

  async register(registerInput: RegisterInput): Promise<RegisterOutput> {
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

      if (exists && exists.nickname === nickname) {
        return {
          ok: false,
          error: '중복된 닉네임이 존재합니다.',
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
      const user = await this.users.save(
        this.users.create({ email, password, nickname, role: UserRole.CLIENT }),
      );
      await this.verification.delete({ email });
      this.telegramService.sendMessageToTelegram({
        message: `${nickname} 님이 회원가입 하셨습니다. `,
        channelId: Number(process.env.TELEGRAM_ALRAM_CHANNEL),
      });
      await this.noticeService.createNotice({
        userId: user.id,
        content: '모두CBT 가입을 환영합니다 !',
      });
      return {
        ok: true,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: '회원가입에 실패했습니다.',
      };
    }
  }

  async sendVerificationMail(
    sendVerificationInput: SendVerificationMailInput,
  ): Promise<SendVerificationMailOutput> {
    try {
      const code = uuidv4();
      const { email } = sendVerificationInput;
      const user = await this.users.findOne({
        where: { email },
        withDeleted: true,
      });
      const isSeceder = await this.secedersService.getSeceder({ email });
      if (isSeceder.ok) {
        return {
          ok: false,
          error: '탈퇴 처리된 계정입니다.',
        };
      }
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
      } else {
        await this.verification.save(newVerification);
      }
      this.mailService.sendVerificationEmail(
        email,
        `${process.env.CLIENT_URL}/register?code=${code}`,
      );
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: '메일을 보낼 수 없습니다.',
      };
    }
  }

  async sendFindPasswordMail(
    sendFindPasswordMailInput: SendFindPasswordMailInput,
  ): Promise<SendFindPasswordMailOutput> {
    try {
      const code = uuidv4();
      const { email } = sendFindPasswordMailInput;
      const user = await this.users.findOne({
        where: { email },
        withDeleted: true,
      });
      const isSeceder = await this.secedersService.getSeceder({ email });
      if (isSeceder.ok) {
        return {
          ok: false,
          error: '탈퇴 처리된 계정입니다.',
        };
      }
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
      } else {
        await this.verification.save(newVerification);
      }
      this.mailService.sendFindPasswordEmail(
        email,
        `${process.env.CLIENT_URL}/register/password?key=${code}`,
      );

      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '메일을 보낼 수 없습니다.',
      };
    }
  }

  async emailVerification(
    emailVerificationInput: EmailVerificationInput,
  ): Promise<EmailVerificationOutput> {
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
    } catch {
      return {
        ok: false,
        error: '이메일 인증에 실패했습니다.',
      };
    }
  }

  async userProfile(
    userProfileInput: UserProfileInput,
  ): Promise<UserProfileOutput> {
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
    } catch {
      return {
        ok: false,
        error: '유저를 찾을 수 없습니다.',
      };
    }
  }

  async login(loginInput: LoginInput, res: Response): Promise<LoginOutput> {
    try {
      const { email, password } = loginInput;
      const user = await this.users.findOne({
        where: { email },
        select: ['id', 'password', 'deletedAt'],
        withDeleted: true,
      });
      const isSeceder = await this.secedersService.getSeceder({ email });
      if (isSeceder.ok) {
        return {
          ok: false,
          error: '탈퇴 처리된 계정입니다.',
        };
      }
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
    } catch {
      return {
        ok: false,
        error: '로그인을 할 수 없습니다.',
      };
    }
  }

  async logout(res: Response): Promise<CoreOutput> {
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

  async me(user: User, ip: string): Promise<MeOutput> {
    const { notices } = await this.noticeService.readMyNotice(user);

    if (user && notices) {
      await this.users.update(user.id, { lastLogInIp: ip });
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

  async checkPassword(
    checkPassWordInput: CheckPasswordInput,
    user: User,
  ): Promise<CheckPasswordOutput> {
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
    } catch {
      return {
        ok: false,
        error: '비밀번호 체크에 실패했습니다.',
      };
    }
  }

  async editProfile(
    editProfileInput: EditProfileInput,
    user: User,
  ): Promise<EditProfileOutput> {
    const {
      nickname,
      password,
      profileImg,
      hasBookmarkedBefore,
      hasSolvedBefore,
      hasReachedPaymentReminder,
      randomExamLimit,
      printLimit,
    } = editProfileInput;
    try {
      const currentUser = await this.users.findOne({
        where: { id: user.id },
        select: { password: true, nickname: true },
      });
      const isEqualToPrevPassword =
        password && (await bcrypt.compare(password, currentUser.password));
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

      if (password) user.password = password;
      if (nickname) user.nickname = nickname;
      if (typeof profileImg === 'string') user.profileImg = profileImg;
      if (hasBookmarkedBefore) user.hasBookmarkedBefore = hasBookmarkedBefore;
      if (hasSolvedBefore) user.hasSolvedBefore = hasSolvedBefore;
      if (hasReachedPaymentReminder) {
        user.hasReachedPaymentReminder = hasReachedPaymentReminder;
        // this.telegramService.sendMessageToTelegram({
        //   message: `${user.nickname} 님이 결제 리마인더에 도달했습니다.`,
        //   channelId: Number(process.env.TELEGRAM_ALRAM_CHANNEL),
        // });
      }
      if (typeof randomExamLimit === 'number') {
        user.randomExamLimit = randomExamLimit;
      }
      if (typeof printLimit === 'number') {
        user.printLimit = printLimit;
      }
      await this.users.save(user);
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: '프로필 수정에 실패했습니다.',
      };
    }
  }

  async deleteUser(user: User): Promise<CoreOutput> {
    try {
      await this.secedersService.createSeceder({
        email: user.email,
      });
      await this.users.delete({ id: user.id });
      this.telegramService.sendMessageToTelegram({
        channelId: Number(process.env.TELEGRAM_ALRAM_CHANNEL),
        message: `가입일자: ${format(user.created_at, 'yy-mm-dd')}\n${
          user.nickname
        } 님이 탈퇴하셨습니다.`,
      });
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '회원탈퇴에 실패했습니다.',
      };
    }
  }

  async restoreUser(restoreUserInput: RestoreUserInput): Promise<CoreOutput> {
    try {
      const { id } = restoreUserInput;
      await this.users.restore({ id });
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '탈퇴 복구에 실패했습니다.',
      };
    }
  }

  async changePasswordAfterVerifying(
    changePasswordAfterVerifyingInput: ChangePasswordAfterVerifyingInput,
  ): Promise<ChangePasswordAfterVerifyingOutput> {
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
    } catch {
      return {
        ok: false,
        error: '비밀번호 변경에 실패했습니다.',
      };
    }
  }

  async createFeedback(
    createFeedback: CreateFeedbackInput,
    user: User,
  ): Promise<CreateFeedbackOutput> {
    try {
      const { content } = createFeedback;
      if (!content) {
        return {
          ok: false,
          error: '한글자 이상 입력해주세요.',
        };
      }
      const newFeedback = this.feedback.create({ content, user });
      this.telegramService.sendMessageToTelegram({
        message: `${user.nickname} 님이 피드백을 보냈습니다.\n\n[내용]\n${content}`,
        channelId: Number(process.env.TELEGRAM_ALRAM_CHANNEL),
      });
      this.feedback.save(newFeedback);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '피드백을 보낼 수 없습니다.',
      };
    }
  }

  async kakaoLogin(req: Request, res: Response): Promise<KakaoLoginOutput> {
    const code = req.url.split('code=').at(-1);
    const resToToken = await axios.post(
      'https://kauth.kakao.com/oauth/token',
      {
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_REST_API_KEY,
        redirect_uri: process.env.REDIRECT_URI + '/kakao',
        code,
      },
      {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    );
    if (!resToToken.data) {
      return {
        ok: false,
        error: '로그인 에러',
      };
    }
    const resToUserInfo = await axios.get('https://kapi.kakao.com/v2/user/me', {
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
    const {
      kakao_account: { email, profile },
    } = resToUserInfo.data;

    const user = await this.users.findOne({
      where: { email },
      withDeleted: true,
    });
    const isSeceder = await this.secedersService.getSeceder({ email });
    if (isSeceder.ok) {
      return {
        ok: false,
        error: '탈퇴 처리된 계정입니다.',
      };
    }
    if (user && user.deletedAt) {
      return {
        ok: false,
        error: '탈퇴 처리된 계정입니다.',
      };
    }
    let newUser: User;
    let token: string;
    const existedNickname = await this.users.findOne({
      where: { nickname: profile.nickname },
    });
    if (existedNickname) {
      profile.nickname = profile.nickname + '#' + uuidv4().substring(0, 4);
    }
    if (!user) {
      newUser = this.users.create({
        email,
        nickname: profile.nickname,
        role: UserRole.CLIENT,
        LoginType: LoginType.KAKAO,
      });
      newUser = await this.users.save(newUser);
      this.telegramService.sendMessageToTelegram({
        message: `${newUser.nickname} 님이 회원가입 하셨습니다. `,
        channelId: Number(process.env.TELEGRAM_ALRAM_CHANNEL),
      });
      token = this.jwtService.sign(newUser.id);
    } else {
      token = this.jwtService.sign(user.id);
    }
    if (user && user.LoginType !== LoginType.KAKAO) {
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

  async googleLogin(req: Request, res: Response): Promise<KakaoLoginOutput> {
    const code = req.url.split('code=').at(-1).split('&').at(0);
    const resToToken = await axios.post(
      `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_SECRET_KEY}&redirect_uri=${process.env.REDIRECT_URI}/google&grant_type=authorization_code`,
      {},
      {
        headers: {
          'content-type': 'x-www-form-urlencoded',
        },
      },
    );
    if (!resToToken.data) {
      return {
        ok: false,
        error: '로그인 에러',
      };
    }

    const resToUserInfo = await axios.get(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: {
          Authorization: `Bearer ${resToToken.data.access_token}`,
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    );
    if (!resToUserInfo.data) {
      return {
        ok: false,
        error: '유저정보를 가져올 수 없습니다.',
      };
    }
    // eslint-disable-next-line prefer-const
    let { email, name } = resToUserInfo.data;

    const user = await this.users.findOne({
      where: { email },
      withDeleted: true,
    });
    const isSeceder = await this.secedersService.getSeceder({ email });
    if (isSeceder.ok) {
      return {
        ok: false,
        error: '탈퇴 처리된 계정입니다.',
      };
    }
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
      name = name + '#' + uuidv4().substring(0, 4);
    }
    let newUser: User;
    let token: string;
    if (!user) {
      newUser = this.users.create({
        email,
        nickname: name,
        role: UserRole.CLIENT,
        LoginType: LoginType.GOOGLE,
      });
      newUser = await this.users.save(newUser);
      this.telegramService.sendMessageToTelegram({
        message: `${newUser.nickname} 님이 회원가입 하셨습니다. `,
        channelId: Number(process.env.TELEGRAM_ALRAM_CHANNEL),
      });
      token = this.jwtService.sign(newUser.id);
    } else {
      token = this.jwtService.sign(user.id);
    }
    if (user && user.LoginType !== LoginType.GOOGLE) {
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
  async getUserByNicknamOrEmail(
    getUserByNicknameOrEmailInput: GetUserByNicknameOrEmailInput,
  ): Promise<GetUserByNicknameOrEmailOutput> {
    try {
      const { keyword } = getUserByNicknameOrEmailInput;
      const user = await this.users.findOne({
        where: [
          {
            nickname: keyword,
          },
          { email: keyword },
        ],
      });
      if (!user) {
        return {
          ok: false,
          error: '유저를 찾을 수 없습니다.',
        };
      }
      return {
        ok: true,
        user,
      };
    } catch {
      return {
        ok: false,
        error: '유저를 찾을 수 없습니다.',
      };
    }
  }

  async searchUser(
    searchUserInput: SearchUserInput,
  ): Promise<SearchUserOutput> {
    try {
      const { name } = searchUserInput;
      const users = await this.users.find({
        where: [
          {
            nickname: Like(`%${name}%`),
          },
          { email: Like(`%${name}%`) },
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
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }

  async updateAdBlockPermission(
    updateAdBlockPermission: UpdateAdblockPermissionInput,
  ): Promise<UpdateAdblockPermissionOutput> {
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
    } catch {
      return {
        ok: false,
        error: '광고차단 설정을 변경할 수 없습니다.',
      };
    }
  }

  async checkUserRole(
    checkUserRoleInput: CheckUserRoleInput,
    user: User,
  ): Promise<CheckUserRoleOutput> {
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
      } else {
        return {
          ok: true,
          confirmed: false,
        };
      }
    } catch {
      return {
        ok: false,
        confirmed: false,
        error: '권한을 확인할 수 없습니다.',
      };
    }
  }

  async changeClientRole(
    changeClientRoleInput: ChangeClientRoleInput,
    user: User,
    queryRunner?: QueryRunner,
  ): Promise<CoreOutput> {
    try {
      const { role } = changeClientRoleInput;
      const protectedRoleList = [UserRole.ADMIN, UserRole.PARTNER];
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
      } else {
        await this.users.save(client);
      }
      return {
        ok: true,
      };
    } catch {
      if (queryRunner) {
        await queryRunner.rollbackTransaction();
      }
      return {
        ok: false,
        error: '권한을 변경할 수 없습니다.',
      };
    }
  }

  async changeClientRoleAndCreatePayment(
    user: User,
    changeClientRoleAndCreatePaymentInput: ChangeClientRoleAndCreatePaymentInput,
  ): Promise<ChangeClientRoleAndCreatePaymentOutput> {
    const queryRunner = this.users.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const { changeClientRoleInput, createPaymentInput } =
        changeClientRoleAndCreatePaymentInput;
      await this.changeClientRole(changeClientRoleInput, user, queryRunner);
      const createPaymentResponse = await this.paymentService.createPayment(
        createPaymentInput,
        user,
        queryRunner,
      );
      await queryRunner.commitTransaction();
      return {
        ok: true,
        paymentId: createPaymentResponse.payment.id,
      };
    } catch (e) {
      await queryRunner.rollbackTransaction();
      return {
        ok: false,
        error: '권한 변경 및 결제에 실패했습니다.',
      };
    } finally {
      await queryRunner.release();
    }
  }

  async createUserRole(
    createUserRoleInput: CreateUserRoleInput,
  ): Promise<CreateUserRoleOutput> {
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
      const userRole = await this.userAndRole.save(
        this.userAndRole.create({
          user,
          role,
        }),
      );
      return {
        ok: true,
        roleId: userRole.id,
      };
    } catch {
      return {
        ok: false,
        error: '권한을 변경할 수 없습니다.',
      };
    }
  }

  async createFreeTrialRole(user: User): Promise<CreateFreeTrialRoleOutput> {
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
    } catch {
      await queryRunner.rollbackTransaction();
      return {
        ok: false,
        error: '무료체험 등록에 실패했습니다.',
      };
    } finally {
      await queryRunner.release();
    }
  }

  async deleteUserRole(
    deleteUserRoleInput: DeleteUserRoleInput,
  ): Promise<DeleteUserRoleOutput> {
    const { id } = deleteUserRoleInput;
    try {
      await this.userAndRole.delete({ id });
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '권한을 삭제할 수 없습니다.',
      };
    }
  }

  async clearFreeTrialRole(): Promise<ClearFreeTrialRoleOutput> {
    const userAndRoles = await this.userAndRole.find({
      where: {
        role: {
          id: 3,
        },
      },
    });
    // 생성된지 1일이 경과된 무료체험 권한 삭제
    const filteredUserAndRoles = userAndRoles.filter((userAndRole) => {
      const { created_at } = userAndRole;
      const differenceInHours = momentTimezone(new Date()).diff(
        momentTimezone(created_at),
        'hours',
      );
      return differenceInHours > 24 + 9;
    });
    try {
      await this.userAndRole.remove(filteredUserAndRoles);
      return {
        ok: true,
        count: filteredUserAndRoles.length,
      };
    } catch {
      return {
        ok: false,
        error: '무료체험 권한 삭제에 실패했습니다.',
      };
    }
  }

  async getRoleCount(
    getRoleCountInput: GetRoleCountInput,
  ): Promise<GetRoleCountOutput> {
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
    } catch {
      return {
        ok: false,
        error: '권한을 확인할 수 없습니다.',
      };
    }
  }

  async getRolesCount(
    getRolesCountInput: GetRolesCountInput,
  ): Promise<GetRolesCountOutput> {
    const { roleIds } = getRolesCountInput;
    try {
      const roles = await this.userAndRole.find({
        where: {
          role: {
            id: In(roleIds),
          },
        },
      });

      return {
        ok: true,
        count: roles.length,
      };
    } catch {
      return {
        ok: false,
        error: '권한을 확인할 수 없습니다.',
      };
    }
  }

  async upsertRecentlyStudiedCategory(
    user: User,
    updateRecentlyStudiedCategory: UpdateRecentlyStudiedCategoryInput,
  ): Promise<UpdateRecentlyStudiedCategoryOutput> {
    try {
      const { categoryName } = updateRecentlyStudiedCategory;
      await this.users.update(user.id, {
        recentlyStudiedCategory: categoryName,
      });
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '최근 학습한 카테고리를 저장할 수 없습니다.',
      };
    }
  }

  async resetSolveLimit(): Promise<CoreOutput> {
    try {
      await this.users.update({}, { solveLimit: 10 });
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '제한 횟수를 초기화할 수 없습니다.',
      };
    }
  }

  async resetRandomExamLimit(): Promise<CoreOutput> {
    try {
      await this.users.update({}, { randomExamLimit: 2 });
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '제한 횟수를 초기화할 수 없습니다.',
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

  async upsertRecentlyStudiedExams(
    user: User,
    upsertRecentlyStudiedExamsInput: UpsertRecentlyStudiedExamsInput,
  ): Promise<UpsertRecentlyStudiedExamsOutput> {
    try {
      const { categoryId, questionIndex, examIds } =
        upsertRecentlyStudiedExamsInput;
      let recentlyStudiedExams = user.recentlyStudiedExams;
      if (!questionIndex) {
        recentlyStudiedExams = recentlyStudiedExams.filter(
          (data) => data.categoryId !== categoryId,
        );
      }
      if (questionIndex) {
        const existed = recentlyStudiedExams.find(
          (data) => data.categoryId === categoryId,
        );
        if (!existed) {
          recentlyStudiedExams.push({ categoryId, questionIndex, examIds });
        }
        if (existed) {
          recentlyStudiedExams = recentlyStudiedExams.map((data) =>
            data.categoryId === categoryId
              ? { ...data, questionIndex, examIds }
              : data,
          );
        }
      }
      await this.users.update(user.id, {
        recentlyStudiedExams,
      });

      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '최근 학습한 문제를 저장할 수 없습니다.',
      };
    }
  }

  async deleteRecentlyStudiedExams(user: User): Promise<CoreOutput> {
    try {
      await this.users.update(user.id, {
        recentlyStudiedExams: [],
      });
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '최근 학습한 문제를 삭제할 수 없습니다.',
      };
    }
  }

  async getPresignedUrl(
    getPresignedUrlInput: GetPresignedUrlInput,
  ): Promise<GetPresignedUrlOutput> {
    try {
      const { path } = getPresignedUrlInput;
      const client = new S3Client({
        region: 'ap-northeast-2',
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY,
          secretAccessKey: process.env.AWS_SECRET_KEY,
        },
      });
      const bucketName = process.env.AWS_BUCKEY_NAME;
      const objectKey = path + '/' + uuidv4(); //
      console.log(objectKey);
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: objectKey,
      });
      const presignedUrl = await getSignedUrl(client, command, {
        expiresIn: 3600,
      });
      return {
        ok: true,
        presignedUrl,
        fileUrl: `${process.env.CLOUD_FRONT_DOMAIN}/${objectKey}`,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: '업로드 URL을 가져올 수 없습니다.',
      };
    }
  }
}
