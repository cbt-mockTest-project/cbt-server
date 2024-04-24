import { UserService } from './user.service';
import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { parseCookies } from 'src/lib/utils/parseCookies';
@Controller('oauth')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/kakao')
  async kakaoLogin(@Req() req: Request, @Res() res: Response) {
    try {
      const cookies = parseCookies(req.headers.cookie);
      const result = await this.userService.kakaoLogin(req, res);
      if (result.error) {
        res.redirect(
          `${process.env.CLIENT_REDIRECT_URI}/auth?message=${result.error}`,
        );
      } else {
        res.redirect(
          `${process.env.CLIENT_REDIRECT_URI}${cookies.auth_redirect || ''}`,
        );
      }

      return {
        ok: true,
      };
    } catch (e) {
      res.redirect(process.env.CLIENT_REDIRECT_URI);
      return { ok: false, error: '카카오 로그인 실패' };
    }
  }
  @Get('/google')
  async googleLogin(@Req() req: Request, @Res() res: Response) {
    try {
      const cookies = parseCookies(req.headers.cookie);
      const result = await this.userService.googleLogin(req, res);
      if (result.error) {
        res.redirect(
          `${process.env.CLIENT_REDIRECT_URI}/auth?message=${result.error}`,
        );
      } else {
        res.redirect(
          `${process.env.CLIENT_REDIRECT_URI}${cookies.auth_redirect || ''}`,
        );
      }
      return {
        ok: true,
      };
    } catch (e) {
      res.redirect(process.env.CLIENT_REDIRECT_URI);
      return { ok: false, error: '구글 로그인 실패' };
    }
  }
}
