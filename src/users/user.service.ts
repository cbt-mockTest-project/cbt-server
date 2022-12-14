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
import { User, UserRole } from './entities/user.entity';
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
          error: '???????????? ?????? ??????????????????.',
        };
      }
      const exists = await this.users.findOne({
        where: { email },
        withDeleted: true,
      });
      if (exists && exists.deletedAt) {
        return {
          ok: false,
          error: '?????? ????????? ???????????????.',
        };
      }
      if (exists) {
        return {
          ok: false,
          error: '?????? ????????? ??????????????????.',
        };
      }
      if (nickname.length >= 10) {
        return {
          ok: false,
          error: '???????????? 10????????? ????????? ??? ????????????.',
        };
      }
      await this.users.save(
        this.users.create({ email, password, nickname, role: UserRole.CLIENT }),
      );
      await this.verification.delete({ email });
      this.telegramService.sendMessageToAlramChannelOfTelegram({
        message: `${nickname} ?????? ???????????? ???????????????. `,
      });
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '??????????????? ??????????????????.',
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
          error: '?????? ????????? ??????????????????.',
        };
      }
      if (user) {
        return {
          ok: false,
          error: '?????? ????????? ??????????????????.',
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
        error: '????????? ?????? ??? ????????????.',
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
          error: '?????? ????????? ??????????????????.',
        };
      }
      if (!user) {
        return {
          ok: false,
          error: '???????????? ?????? ??????????????????.',
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
        error: '????????? ?????? ??? ????????????.',
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
          error: '???????????? ?????? ???????????????.',
        };
      }
      return {
        ok: true,
        email: verification.email,
      };
    } catch {
      return {
        ok: false,
        error: '????????? ????????? ??????????????????.',
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
          error: '???????????? ?????? ???????????????.',
        };
      }
      return {
        user,
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '????????? ?????? ??? ????????????.',
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
          error: '?????? ????????? ??????????????????.',
        };
      }
      if (!user) {
        return {
          ok: false,
          error: '???????????? ?????? ??????????????????.',
        };
      }
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: '??????????????? ?????? ??????????????????.',
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
        error: '???????????? ??? ??? ????????????.',
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
      error: '????????? ????????? ????????????.',
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
          error: '??????????????? ?????? ??????????????????.',
        };
      }
      return { ok: true };
    } catch {
      return {
        ok: false,
        error: '???????????? ????????? ??????????????????.',
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
        select: { password: true },
      });
      const isEqualToPrevPassword =
        password && (await bcrypt.compare(password, currentUser.password));
      if (isEqualToPrevPassword) {
        return {
          ok: false,
          error: '????????? ??????????????? ???????????????.',
        };
      }
      if (nickname.length >= 10) {
        return {
          ok: false,
          error: '???????????? 10????????? ????????? ??? ????????????.',
        };
      }
      user.password = password;
      user.nickname = nickname;
      await this.users.save(user);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '????????? ????????? ??????????????????.',
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
        error: '??????????????? ??????????????????.',
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
        error: '?????? ????????? ??????????????????.',
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
          error: '???????????? ?????? ??????????????????.',
        };
      }
      const user = await this.users.findOne({
        where: { email },
      });
      if (!user) {
        return {
          ok: false,
          error: '???????????? ?????? ??????????????????.',
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
        error: '???????????? ????????? ??????????????????.',
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
          error: '????????? ?????? ??????????????????.',
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
        error: '???????????? ?????? ??? ????????????.',
      };
    }
  }
}
