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

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Verification)
    private readonly verification: Repository<Verification>,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
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
      const exists = await this.users.findOneBy({ email });
      if (exists) {
        return {
          ok: false,
          error: '이미 가입된 이메일입니다.',
        };
      }
      await this.users.save(
        this.users.create({ email, password, nickname, role: UserRole.CLIENT }),
      );
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
      const newVerification = this.verification.create({ email, code });
      const prevVerification = await this.verification.findOne({
        where: { email },
      });
      if (prevVerification) {
        await this.verification.update(prevVerification.id, { code });
        return {
          ok: true,
        };
      }
      await this.verification.save(newVerification);
      this.mailService.sendVerificationEmail(
        email,
        `${process.env.CLIENT_URL}/confirm?code=${newVerification.code}`,
      );
      return {
        ok: true,
      };
    } catch (e) {
      console.log(e);
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

  async login(loginInput: LoginInput): Promise<LoginOutput> {
    try {
      const { email, password } = loginInput;
      const user = await this.users.findOne({
        where: { email },
        select: ['id', 'password'],
      });
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
}
