import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AllExceptionsFilter } from 'all-exception.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.enableCors()
  await app.listen(3333);
}
bootstrap();
