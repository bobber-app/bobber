import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { useContainer } from 'class-validator'

async function bootstrap() {
  const appOptions = { cors: true }
  const app = await NestFactory.create(AppModule, appOptions)
  app.setGlobalPrefix('api')

  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  const config = new DocumentBuilder()
    .setTitle('Bobber')
    .setDescription('The Bobber API description')
    .setVersion('1.0')
    .addTag('api')
    .addBearerAuth()
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/docs', app, documentFactory)
  SwaggerModule.setup('/docs-json', app, documentFactory)

  await app.listen(8080)
}

bootstrap().catch((err) => {
  console.log(err)
})
