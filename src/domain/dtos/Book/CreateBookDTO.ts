import { IsObject, IsString, ValidateNested } from "class-validator";
import { IMetadata } from "../../models/Book";
import { Type } from "class-transformer";
import { MetadataDTO } from "./MetaDataDTO";

export class CreateBookDTO {
  @IsString()
  gutenbergId: string;
  @IsString()
  title: string;
  @IsString()
  author: string;
  @IsString()
  coverPictureUrl: string;
  @IsObject()
  @ValidateNested()
  @Type(() => MetadataDTO)
  metadata: IMetadata;

  constructor(
    gutenbergId: string,
    title: string,
    author: string,
    coverPictureUrl: string,
    metadata: IMetadata
  ) {
    this.gutenbergId = gutenbergId;
    this.title = title;
    this.author = author;
    this.coverPictureUrl = coverPictureUrl;
    this.metadata = metadata;
  }
}
