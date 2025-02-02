export class GetBookDTO {
  id: string;
  title: string;
  author: string;
  coverPictureUrl: string;
  content?: string;
  metadata: string;

  constructor(
    id: string,
    title: string,
    author: string,
    coverPictureUrl: string,
    metadata: string,
    content?: string
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.coverPictureUrl = coverPictureUrl;
    this.content = content;
    this.metadata = metadata;
  }
}
