import { IsString } from "class-validator";

export class CreateBookDTO {
  @IsString()
  id: string;
  @IsString()
  title: string;
  @IsString()
  author: string;
  @IsString()
  coverPictureUrl: string;
  @IsString()
  metadata: string;

  constructor(
    id: string,
    title: string,
    author: string,
    coverPictureUrl: string,
    metadata: string
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.coverPictureUrl = coverPictureUrl;
    this.metadata = metadata;
  }
}
