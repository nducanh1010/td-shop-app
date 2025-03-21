import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  // @UseGuards(JwtAuthGuard)
  // @Post('auth/login')
  // async login(@Request() req) {
  // }
}
