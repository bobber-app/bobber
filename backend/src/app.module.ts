import { AppController } from './app.controller'
import { Module, OnModuleInit } from '@nestjs/common'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { MikroORM } from '@mikro-orm/core'
import { DatabaseSeeder } from '@/seeders/DatabaseSeeder'

@Module({
  imports: [MikroOrmModule.forRoot(), UserModule, AuthModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly orm: MikroORM) {}

  async onModuleInit(): Promise<void> {
    // Run pending migrations at startup
    await this.orm.getMigrator().up()

    await this.orm.getSeeder().seed(DatabaseSeeder)
  }
}
