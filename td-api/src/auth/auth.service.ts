import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { IUser } from 'src/users/user.interface';
import { UsersService } from 'src/users/users.service';
import ms, { StringValue } from 'ms';
@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  createRefreshToken = (payload) => {
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn:
        //@ts-ignore
        ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')) / 1000,
    });
    return refreshToken;
  };
  // this run in strategy
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);

    if (user && this.usersService.IsValidPassword(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async processNewToken(refresh_token: string, response: Response) {
    const res = await this.jwtService.verifyAsync(refresh_token, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
    });
    if (!res) {
      throw new BadRequestException(
        'Refresh token không hợp lệ, vui lòng đăng nhập lại',
      );
    }
    const user = await this.usersService.findUserByRefreshToken(refresh_token);
    if (user) {
      const { id, name, email } = user;
      const payload = {
        sub: 'token refresh',
        iss: 'from server',
        id,
        name,
        email,
      };
      const refresh_token = this.createRefreshToken(payload);
      await this.usersService.updateUserToken(refresh_token, id);
      response.clearCookie('refresh_token');
      response.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        maxAge: ms(
          this.configService.get<string>('JWT_REFRESH_EXPIRE') as StringValue,
        ),
      });
      return {
        access_token: this.jwtService.sign(payload),
        user: {
          id,
          name,
          email,
        },
      };
    }
  }
  async login(user: IUser, response: Response) {
    const { id, username, email } = user;
    const payload = {
      username,
      email,
      id,
      sub: 'token login',
      iss: 'from server',
    };
    const refresh_token = this.createRefreshToken(payload);
    await this.usersService.updateUserToken(refresh_token, id);
    // set refresh_token as cookies
    response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      //@ts-ignore
      maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')), //milisecond
    });
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id,
        username,
        email,
      },
    };
  }
}
