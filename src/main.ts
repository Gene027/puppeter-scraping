import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const dotenv_path = path.resolve(process.cwd(), '.env');
dotenv.config({ path: dotenv_path });

const logger = new Logger('main.app.bootstrap');
const port = process.env.PORT ?? 9000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('War Engine API')
    .setDescription('The War Engine API')
    .setVersion('1.0')
    .addTag('war-engine')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  await app.listen(port);

  logger.log('--------- Application starts ---------');
  logger.log('--------------------------------------');
  logger.log(`Listening on port: ${port} for the app`);
}
bootstrap();
