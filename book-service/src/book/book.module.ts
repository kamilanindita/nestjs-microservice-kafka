import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: 'BOOK_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: configService.get('BOOK_CLIENT_ID'),
              brokers: [configService.get('KAFKA_URL')],
            },
            consumer: {
              groupId: configService.get('BOOK_GROUP_ID'),
            },
          },
        }),
    },
  BookService],
  controllers: [BookController]
})
export class BookModule {}
