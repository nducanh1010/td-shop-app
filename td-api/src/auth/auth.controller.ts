import { Controller, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { Public, SkipCheckPermission } from 'src/decorator/customize';
import { Request as RequestExpress, Response } from 'express';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @SkipCheckPermission()
  @Public()
  @UseGuards(LocalAuthGuard) // guard trả vê user nếu thành công dưới dạng req.user
  async login(@Request() req, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(req.user, response);
  }
  @Public()
  @Post('/refresh')
  async handleRefreshToken(
    @Req() request: RequestExpress,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refresh_token = request.cookies['refresh_token'];
    return this.authService.processNewToken(refresh_token, response);
    // return this.user
  }
}
