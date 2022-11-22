import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { BookService } from './book.service';
import { PayloadBookService } from './payload.interface';

@Controller('book')
export class BookController {
    constructor(
        private readonly bookService: BookService
    ){}

    @MessagePattern('book.getAll')
    getBooks(): any {
        return this.bookService.findAll();
    }

    @MessagePattern('book.getById')
    getBookById(payload: PayloadBookService): any {
        return this.bookService.findOne(Number(payload.id));
    }

    @MessagePattern('book.create')
    createBook(payload: PayloadBookService): any {
        return this.bookService.create(payload.book);
    }

    @MessagePattern('book.update')
    updateBook(payload: PayloadBookService): any {
        return this.bookService.update(Number(payload.id), payload.book);
    }

    @MessagePattern('book.delete')
    deleteBookById(payload: PayloadBookService): any {
        return this.bookService.delete(Number(payload.id));
    }
}
