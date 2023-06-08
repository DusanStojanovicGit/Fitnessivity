import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { cookieOptions } from 'src/cookieOptions';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    cookieSession({
      name: 'session',
      keys: ['secretkey'],
      cookie: {
        sameSite: 'none' as const, 
        secure: true
      }
    }),
  );
  app.enableCors({origin: 'http://10.241.185.86:4200', credentials: true});
  app.listen(3000, '0.0.0.0');
}
bootstrap();
