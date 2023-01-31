import { UserService } from './user.service';
import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
@Controller('oauth')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/kakao')
  async kakaoLogin(@Req() req: Request, @Res() res: Response) {
    try {
      const code = req.url.split('code=').at(-1);
      await this.userService.kakaoLogin({ code }, res);
      res.redirect(process.env.CLIENT_REDIRECT_URI);
      return {
        ok: true,
      };
    } catch (e) {
      res.redirect(process.env.CLIENT_REDIRECT_URI);
      return { ok: false, error: '카카오 로그인 실패' };
    }
  }
}
