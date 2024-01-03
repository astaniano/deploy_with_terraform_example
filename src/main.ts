import * as dotenv from 'dotenv-flow';

dotenv.config();

import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableVersioning({
    type: VersioningType.URI,
  });

  // TODO:1
  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new GenericExceptionFilter(httpAdapter));

  await app.listen(80, '0.0.0.0');
}
bootstrap();
