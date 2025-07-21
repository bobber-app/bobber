import { AppController } from './app.controller'
import { Module, OnModuleInit } from '@nestjs/common'
import { MikroORM } from '@mikro-orm/mysql'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { UserController } from './user/user.controller'
import { UserModule } from './user/user.module'

@Module({
  imports: [MikroOrmModule.forRoot(), UserModule],
  controllers: [AppController, UserController],
  providers: [],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly orm: MikroORM) {}

  async onModuleInit(): Promise<void> {
    await this.orm.getMigrator().up()
  }
}
