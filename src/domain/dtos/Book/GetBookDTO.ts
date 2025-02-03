import { IMetadata } from "../../models/Book";

export class GetBookDTO {
  id: string;
  gutenbergId: string;
  title: string;
  author: string;
  coverPictureUrl: string;
  content?: string;
  metadata: IMetadata;

  constructor(
    id: string,
    gutenbergId: string,
    title: string,
    author: string,
    coverPictureUrl: string,
    metadata: IMetadata,
    content?: string
  ) {
    (this.id = id), (this.gutenbergId = gutenbergId);
    this.title = title;
    this.author = author;
    this.coverPictureUrl = coverPictureUrl;
    this.content = content;
    this.metadata = metadata;
  }
}
