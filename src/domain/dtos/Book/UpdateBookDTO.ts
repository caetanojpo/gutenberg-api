import { IsString } from "class-validator";

export class UpdateBookDTO {
  @IsString()
  title: string;
  @IsString()
  author: string;
  @IsString()
  coverPictureUrl: string;
  @IsString()
  content: string;
  @IsString()
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
