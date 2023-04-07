import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { JwtGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() { username, password }: LoginDTO) {
    return this.authService.login(username, password);
  }

  @UseGuards(JwtGuard)
  @Get('/test-auth')
  test(@Req() req) {
    console.log(req.user);
    return { name: 'User' };
  }
}
