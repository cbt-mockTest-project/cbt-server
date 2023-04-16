import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useGlobalFilters(new AllExceptionsFilter());
  const server = await app.listen(80);
  process.on('SIGINT', function () {
    server.close(function () {
      console.log('server closed');
      process.exit(0);
    });
  });
  console.log('go to graphql : http://localhost:80/graphql');
}
bootstrap();
