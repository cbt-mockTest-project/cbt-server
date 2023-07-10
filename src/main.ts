import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());
  // const redisService = app.get(RedisService);
  // const redisIoAdapter = new RedisIoAdapter(redisService);
  // await redisIoAdapter.connectToRedis();
  // app.useWebSocketAdapter(redisIoAdapter);
  await app.listen(80);

  // const cleanup = async (signal) => {
  //   server.close(() => {
  //     redisService.disconnect(); // Redis 연결 종료 메소드를 추가해야 합니다.
  //     process.exit(0);
  //   });
  // };

  // process.on('SIGINT', cleanup);
  // process.on('SIGTERM', cleanup);
  // process.on('uncaughtException', cleanup);

  console.log('go to graphql : http://localhost:80/graphql');
}

bootstrap();
