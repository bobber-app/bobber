import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { LocalAuthGuard } from './local-auth.guard'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './jwt-auth.guard'
import { AuthenticatedRequest } from './auth.interfaces'
import { CreateUserDto } from '@/user/dto/create-user.dto'
import { Public } from '@/shared/public.decorator'
import { LoginUserDto } from '@/auth/dto/login-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @UsePipes(new ValidationPipe())
  @Public()
  @Post('/login')
  login(@Body() loginDto: LoginUserDto, @Request() req: AuthenticatedRequest) {
    return this.authService.login(req.user)
  }

  @UseGuards(LocalAuthGuard)
  @Post('/logout')
  logout(@Request() req: AuthenticatedRequest) {
    return req.logout()
  }

  @Post('/register')
  @Public()
  async register(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req: AuthenticatedRequest) {
    return req.user
  }
}
