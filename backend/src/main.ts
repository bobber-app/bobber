import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const appOptions = { cors: true }
  const app = await NestFactory.create(AppModule, appOptions)
  app.setGlobalPrefix('api')

  const config = new DocumentBuilder()
    .setTitle('RabotPD')
    .setDescription('The RabotPD API description')
    .setVersion('1.0')
    .addTag('api')
    .addBearerAuth()
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/docs', app, documentFactory)
  SwaggerModule.setup('/docs-json', app, documentFactory)

  await app.listen(3000)
}

bootstrap().catch((err) => {
  console.log(err)
})
