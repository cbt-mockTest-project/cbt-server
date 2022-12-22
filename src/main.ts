import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(80);
  console.log('go to graphql : http://localhost:80/graphql');
}
bootstrap();
