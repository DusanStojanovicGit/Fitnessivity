import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    cookieSession({
      keys: ['secretkey'],
      cookie: {
        sameSite: 'none', // Set SameSite attribute to None
        secure: true, // Set the secure flag to ensure the cookie is sent over HTTPS
      },
    }),
  );
  app.enableCors({origin: 'http://localhost:4200', credentials: true});
  await app.listen(3000);
}
bootstrap();
