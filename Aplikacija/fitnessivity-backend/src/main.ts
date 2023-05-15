import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieSession({
      keys: ['secretkey'],
    }),
  );
  app.enableCors({origin: 'http://localhost:4200'})
  await app.listen(3000);
}
bootstrap();
