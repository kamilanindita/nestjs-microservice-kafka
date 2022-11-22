import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: 'CUSTOMER_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: configService.get('CUSTOMER_CLIENT_ID'),
            brokers: [configService.get('KAFKA_URL')],
          },
          consumer: {
            groupId: configService.get('CUSTOMER_GROUP_ID'),
          },
        },
      }),
    }
  ],
  controllers: [CustomerController],
})
export class CustomerModule {}
