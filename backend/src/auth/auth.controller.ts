import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { LocalAuthGuard } from './local-auth.guard'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './jwt-auth.guard'
import { AuthenticatedRequest } from './auth.interfaces'

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Request() req: AuthenticatedRequest) {
    return this.authService.login(req.user)
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/logout')
  logout(@Request() req: AuthenticatedRequest) {
    return req.logout()
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: AuthenticatedRequest) {
    return req.user
  }
}
