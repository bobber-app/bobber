import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MikroORM } from '@mikro-orm/mysql'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(process.env.PORT ?? 3000)
  await MikroORM.init({
    entities: ['./dist/app/**/*.entity.js'],
    entitiesTs: ['./src/app/**/*.entity.ts'],
    dbName: 'my-db-name',
  })
}

bootstrap()
