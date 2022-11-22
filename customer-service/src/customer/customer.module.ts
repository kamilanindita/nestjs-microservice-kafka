import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
    },
  CustomerService],
  controllers: [CustomerController],
})
export class CustomerModule {}
