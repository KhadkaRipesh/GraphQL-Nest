import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './entities/book.entity';
import { AddBookArgs } from './args/add-book.args';
import { UpdateBookArgs } from './args/update-book.args';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepoService: Repository<BookEntity>,
  ) {}
  async findBooks(): Promise<BookEntity[]> {
    return await this.bookRepoService.find();
  }
  async findBookById(condition: any): Promise<BookEntity> {
    return await this.bookRepoService.findOne({ where: { ...condition } });
  }
  async deleteBook(id: number): Promise<string> {
    await this.bookRepoService.delete(id);
    return 'Book deleted successfully';
  }
  async addBook(addBookArgs: AddBookArgs): Promise<string> {
    const book: BookEntity = new BookEntity();
    book.title = addBookArgs.title;
    book.price = addBookArgs.price;
    await this.bookRepoService.save(book);
    return 'Book added Successfully';
  }

  async updateBook(updateBookArgs: UpdateBookArgs): Promise<string> {
    const book: BookEntity = await this.bookRepoService.findOne({
      where: { id: updateBookArgs.id },
    });
    book.title = updateBookArgs.title;
    book.price = updateBookArgs.price;
    await this.bookRepoService.save(book);
    return 'Book updated Successfully';
  }
}
