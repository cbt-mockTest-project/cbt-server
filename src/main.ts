import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(8070);
  console.log('go to graphql : http://localhost:8070/graphql');
}
bootstrap();
