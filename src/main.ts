import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envs } from './config/envs';
import { Logger } from '@nestjs/common';

async function bootstrap() {

  const logger = new Logger('Payments Microservice')

  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  //   transport: Transport.NATS,
  //   options: {
  //     servers: envs.natsServer
  //   }
  // });

  // await app.listen();

  const app = await NestFactory.create(AppModule);
  await app.listen(envs.port)

  logger.log(`Payments Microservice running on port ${ envs.port }`)
}
bootstrap();
