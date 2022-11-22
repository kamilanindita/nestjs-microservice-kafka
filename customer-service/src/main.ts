import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: new Logger,
  })
  const configService = app.get<ConfigService>(ConfigService)
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [configService.get('KAFKA_URL')],
      },
      consumer: {
        groupId: configService.get('CUSTOMER_GROUP_ID'),
      },
    }
  })

  app.startAllMicroservices()
}
bootstrap();
