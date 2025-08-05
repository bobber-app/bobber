import { Injectable } from '@nestjs/common'
import { UserService } from '@/user/user.service'
import { User } from '@/user/user.entity'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from '@/user/dto/create-user.dto'
import * as argon2 from 'argon2'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findOneByUsername(username)
    if (await argon2.verify(user.password, pass)) {
      return user
    }
    return null
  }

  login(user: User) {
    const payload = { username: user.username, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto)
    const payload = { username: user.username, sub: user.id }

    return {
      access_token: this.jwtService.sign(payload),
      user: user,
    }
  }
}
