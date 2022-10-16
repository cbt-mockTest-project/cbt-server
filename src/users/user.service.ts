import { JwtService } from 'src/jwt/jwt.service';
import { UserProfileInput, UserProfileOutput } from './dtos/userProfile.dto';
import { RegisterInput, RegisterOutput } from './dtos/register.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { LoginInput, LoginOutput } from './dtos/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerInput: RegisterInput): Promise<RegisterOutput> {
    try {
      const { email, password, nickname } = registerInput;
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
