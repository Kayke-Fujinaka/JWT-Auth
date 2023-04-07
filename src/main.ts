import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';

import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3002);
}
bootstrap();
