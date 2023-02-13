import { KakaoLoginInput, KakaoLoginOutput } from './dtos/kakaoLogin.dto';
import { NoticeService } from './notice.service';
import { TelegramService } from './../telegram/telegram.service';
import {
  CreateFeedbackInput,
  CreateFeedbackOutput,
} from './dtos/createFeedback.dto';
import {
  SendFindPasswordMailInput,
  SendFindPasswordMailOutput,
} from './dtos/sendFindPasswordMail.dto';
import { RestoreUserInput } from './dtos/restoreUser.dto';
import {
  CheckPasswordInput,
  CheckPasswordOutput,
} from './dtos/checkPassword.dto';
import { CoreOutput } from 'src/common/dtos/output.dto';
import {
  EmailVerificationInput,
  EmailVerificationOutput,
} from './dtos/EmailVerification.dto';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from 'src/jwt/jwt.service';
import { UserProfileInput, UserProfileOutput } from './dtos/userProfile.dto';
import { RegisterInput, RegisterOutput } from './dtos/register.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginType, User, UserRole } from './entities/user.entity';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { Verification } from './entities/verification.entity';
import {
  SendVerificationMailInput,
  SendVerificationMailOutput,
} from './dtos/sendVerificationMail.dto';
import { MailService } from 'src/mail/mail.service';
import { Response } from 'express';
import { MeOutput } from './dtos/me.dto';
import { EditProfileInput, EditProfileOutput } from './dtos/editProfile.dto';
import * as bcrypt from 'bcrypt';
import {
  ChangePasswordAfterVerifyingInput,
  ChangePasswordAfterVerifyingOutput,
} from './dtos/changePasswordAfterVerifying.dto';
import { Feedback } from './entities/feedback.entity';
import axios from 'axios';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Verification)
    private readonly verification: Repository<Verification>,
    @InjectRepository(Feedback)
    private readonly feedback: Repository<Feedback>,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly telegramService: TelegramService,
    private readonly noticeService: NoticeService,
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
    } catch {
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

  async me(user: User): Promise<MeOutput> {
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
    const { nickname, password } = editProfileInput;
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
        console.log(currentUser.nickname);
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
    } catch (e) {
      return {
        ok: false,
        error: '프로필 수정에 실패했습니다.',
      };
    }
  }

  async deleteUser(user: User): Promise<CoreOutput> {
    try {
      this.users.softDelete({ id: user.id });
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

  async kakaoLogin(
    kakaoLoginInput: KakaoLoginInput,
    res: Response,
  ): Promise<KakaoLoginOutput> {
    const { code } = kakaoLoginInput;
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
    if (user && user.deletedAt) {
      return {
        ok: false,
        error: '탈퇴 처리된 계정입니다.',
      };
    }
    let newUser: User;
    let token: string;
    if (!user) {
      newUser = this.users.create({
        email,
        nickname: profile.nickname,
        role: UserRole.CLIENT,
        LoginType: LoginType.KAKAO,
      });
      newUser = await this.users.save(newUser);
      this.telegramService.sendMessageToAlramChannelOfTelegram({
        message: `${newUser.nickname} 님이 회원가입 하셨습니다. `,
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
    });
    return {
      ok: true,
      token,
    };
  }

  async googleLogin(
    kakaoLoginInput: KakaoLoginInput,
    res: Response,
  ): Promise<KakaoLoginOutput> {
    const { code } = kakaoLoginInput;
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
    const { email, name } = resToUserInfo.data;

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
      this.telegramService.sendMessageToAlramChannelOfTelegram({
        message: `${newUser.nickname} 님이 회원가입 하셨습니다. `,
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
    });
    return {
      ok: true,
      token,
    };
  }
}
