export interface IBook {
  id: string;
  title: string;
  author: string;
  coverPictureUrl: string;
  content?: string;
  metadata: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Book implements IBook {
  id: string;
  title: string;
  author: string;
  coverPictureUrl: string;
  content?: string;
  metadata: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(book: IBook) {
    (this.id = book.id),
      (this.title = book.title),
      (this.author = book.author),
      (this.coverPictureUrl = book.coverPictureUrl),
      (this.content = book.content),
      (this.metadata = book.metadata),
      (this.createdAt = book.createdAt),
      (this.updatedAt = book.updatedAt);
  }
}
