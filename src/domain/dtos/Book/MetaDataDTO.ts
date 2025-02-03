import { IsString, IsInt } from "class-validator";

export class MetadataDTO {
  @IsString()
  published: string;

  @IsInt()
  downloads: number;

  @IsString()
  language: string;

  @IsString()
  category: string;

  @IsString()
  rights: string;

  constructor(
    published: string,
    downloads: number,
    language: string,
    category: string,
    rights: string
  ) {
    this.published = published;
    this.downloads = downloads;
    this.language = language;
    this.category = category;
    this.rights = rights;
  }
}
