import { RegisterInput, RegisterOutput } from './dtos/register.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
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
}
