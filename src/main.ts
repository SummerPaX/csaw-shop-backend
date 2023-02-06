import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { delayMiddleware } from './lib/delay.middleware'
import { errorMiddleware } from './lib/error.middleware'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('CSAW Shop Backend')
    .setDescription('Backend for the Shop Assignment')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.enableCors()
  app.use(delayMiddleware)
  app.use(errorMiddleware)
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000)
}

bootstrap()
