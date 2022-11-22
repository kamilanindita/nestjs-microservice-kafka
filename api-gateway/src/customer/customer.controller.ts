import { Inject, Controller, Get, Post, Put, Delete, Body, Param, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { UpdateCustomerDTO } from './dto/update-customer.dto';
import { PayloadCustomerService } from './payload-customer-service.interface';
import { ClientKafka } from '@nestjs/microservices';

@Controller('customer')
export class CustomerController implements OnModuleInit, OnModuleDestroy {
    constructor(
        @Inject('CUSTOMER_SERVICE') private readonly client: ClientKafka,
    ) {}

    async onModuleInit() {
        ['customer.getAll', 'customer.getById', 'customer.create', 'customer.update', 'customer.delete'].forEach((key) => this.client.subscribeToResponseOf(`${key}`));
        await this.client.connect();
    }

    async onModuleDestroy() {
        await this.client.close();
    }

    @Get()
    getCustomers(): any {
        const payload: PayloadCustomerService = {
            id: null,
            customer: null
        }
        return this.client.send('customer.getAll', payload)
    }

    @Get(':id')
    getCustomerById(@Param('id') id: number): any {
        const payload: PayloadCustomerService = {
            id: id,
            customer: null
        }
        return this.client.send('customer.getById', payload)
    }

    @Post()
    createCustomer(@Body() createCustomerDTO: CreateCustomerDTO): any {
        const payload: PayloadCustomerService = {
            id: null,
            customer: createCustomerDTO
        }
        return this.client.send('customer.create', payload)
    }

    @Put(':id')
    updateCustomer(@Param('id') id: number, @Body() updateCustomerDTO: UpdateCustomerDTO): any {
        const payload: PayloadCustomerService = {
            id: id,
            customer: updateCustomerDTO
        }
        return this.client.send('customer.update', payload)
    }

    @Delete(':id')
    deleteCustomerById(@Param('id') id: number): any {
        const payload: PayloadCustomerService = {
            id: id,
            customer: null
        }
        return this.client.send('customer.delete', payload)
    }
}
