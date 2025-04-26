import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { validationPipeOptions } from './core/configs';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const portHttp = configService.get<string>('PORT_HTTP');
  const logger = new Logger('Main');

  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));

  await app.listen(portHttp ?? 3000);
  logger.log(`Api service is running on port:${portHttp}`);
}
bootstrap();
