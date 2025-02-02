export class GetBookDTO {
  title: string;
  author: string;
  coverPictureUrl: string;
  content: string;
  metadata: string;

  constructor(
    title: string,
    author: string,
    coverPictureUrl: string,
    content: string,
    metadata: string
  ) {
    this.title = title;
    this.author = author;
    this.coverPictureUrl = coverPictureUrl;
    this.content = content;
    this.metadata = metadata;
  }
}
