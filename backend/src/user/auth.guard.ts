import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY } from '../shared/public.decorator'
import { JWTObject } from './user.interface'
import { SECRET } from '../config'
import { UserService } from './user.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic: boolean = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) return true

    const request: Request = context.switchToHttp().getRequest()
    const token: string | undefined = this.extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException(token)
    }
    try {
      const decoded: JWTObject = await this.jwtService.verifyAsync(token, {
        secret: SECRET,
      })

      // Check roles
      return
    } catch (e) {
      throw new UnauthorizedException(e)
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
