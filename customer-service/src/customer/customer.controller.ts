import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CustomerService } from './customer.service';
import { PayloadCustomerService } from './payload.interface';

@Controller('customer')
export class CustomerController {
    constructor(
        private readonly customerService: CustomerService
    ){}

    @MessagePattern('customer.getAll')
    readMessage(){
        return this.customerService.findAll();
    }

    @MessagePattern('customer.getById')
    getCustomerById(payload: PayloadCustomerService): any {
        return this.customerService.findOne(Number(payload.id));
    }

    @MessagePattern('customer.create')
    createCustomer(payload: PayloadCustomerService): any {
        return this.customerService.create(payload.customer);
    }

    @MessagePattern('customer.update')
    updateCustomer(payload: PayloadCustomerService): any {
        return this.customerService.update(Number(payload.id), payload.customer);
    }

    @MessagePattern('customer.delete')
    deleteCustomerById(payload: PayloadCustomerService): any {
        return this.customerService.delete(Number(payload.id));
    }
}
