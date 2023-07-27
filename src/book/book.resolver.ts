import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Book } from './schema/book.schema';
import { BookService } from './book.service';
import { AddBookArgs } from './args/add-book.args';
import { UpdateBookArgs } from './args/update-book.args';

@Resolver((of) => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(() => [Book], { name: 'books' })
  getAllBooks() {
    return this.bookService.findBooks();
  }

  @Query(() => Book)
  getBookByID(@Args({ name: 'bookId', type: () => Int }) id: number) {
    return this.bookService.findBookById(id);
  }

  @Mutation(() => String, { name: 'delete' })
  deleteBook(@Args({ name: 'bookId', type: () => Int }) id: number) {
    return this.bookService.deleteBook(id);
  }

  @Mutation(() => String, { name: 'add' })
  addBook(@Args('addBookArgs') addBookArgs: AddBookArgs) {
    return this.bookService.addBook(addBookArgs);
  }

  @Mutation(() => String, { name: 'updateBook' })
  updateBook(@Args('updateBookArgs') updatdeBookArgs: UpdateBookArgs) {
    return this.bookService.updateBook(updatdeBookArgs);
  }
}
