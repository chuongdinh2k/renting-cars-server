import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ExceptionInterceptor } from '@common/interceptors/exception.interceptor';
import { swaggerConfigs } from '@database/config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  swaggerConfigs(app, configService, logger);

  app.useGlobalInterceptors(new ExceptionInterceptor());

  app.enableCors();
  await app.listen(port, '0.0.0.0');
  logger.log(`App is running on port: ${port}`);
}
bootstrap();
