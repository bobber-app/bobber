import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { User } from './user.entity'
import { JwtModule } from '@nestjs/jwt'
import { EXPIRES_IN, SECRET } from '../jwt.config'

@Module({
  imports: [
    MikroOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: SECRET,
      signOptions: { expiresIn: EXPIRES_IN },
    }),
  ],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
