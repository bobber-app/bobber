import { AppController } from './app.controller'
import { Module, OnModuleInit } from '@nestjs/common'
import { MikroORM } from '@mikro-orm/mysql'
import { MikroOrmModule } from '@mikro-orm/nestjs'

@Module({
  imports: [MikroOrmModule.forRoot()],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly orm: MikroORM) {}

  async onModuleInit(): Promise<void> {
    await this.orm.getMigrator().up()
  }
}
