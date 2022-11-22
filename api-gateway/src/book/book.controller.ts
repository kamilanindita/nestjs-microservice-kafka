import { Controller, Inject, Get, Param, Post, Body, Put, Delete, OnModuleDestroy, OnModuleInit  } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateBookDTO } from './dto/create-book.dto';
import { UpdateBookDTO } from './dto/update-book.dto';
import { PayloadBookService } from './payload-book-service.interface';

@Controller('book')
export class BookController implements OnModuleInit, OnModuleDestroy {
    constructor(
        @Inject('BOOK_SERVICE') private readonly client: ClientKafka,
    ){}

    async onModuleInit() {
        ['book.getAll', 'book.getById', 'book.create', 'book.update', 'book.delete'].forEach((key) => this.client.subscribeToResponseOf(`${key}`));
        await this.client.connect();
    }

    async onModuleDestroy() {
        await this.client.close();
    }

    @Get()
    getBooks(): any {
        const payload: PayloadBookService = {
            id: null,
            book: null
        }
        return this.client.send('book.getAll', payload)
    }

    @Get(':id')
    getBookById(@Param('id') id: number): any {
        const payload: PayloadBookService = {
            id: id,
            book: null
        }
        return this.client.send('book.getById', payload)
    }

    @Post()
    createBook(@Body() createBookDTO: CreateBookDTO): any {
        const payload: PayloadBookService = {
            id: null,
            book: createBookDTO
        }
        return this.client.send('book.create', payload)
    }

    @Put(':id')
    updateBook(@Param('id') id: number, @Body() updateBookDTO: UpdateBookDTO): any {
        const payload: PayloadBookService = {
            id: id,
            book: updateBookDTO
        }
        return this.client.send('book.update', payload)
    }

    @Delete(':id')
    deleteBookById(@Param('id') id: number): any {
        const payload: PayloadBookService = {
            id: id,
            book: null
        }
        return this.client.send('book.delete', payload)
    }

}
