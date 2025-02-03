import { IsObject, IsString, ValidateNested } from "class-validator";
import { IMetadata } from "../../models/Book";
import { Type } from "class-transformer";
import { MetadataDTO } from "./MetaDataDTO";

export class UpdateBookMetadataDTO {
  @IsObject()
  @ValidateNested()
  @Type(() => MetadataDTO)
  metadata: IMetadata;

  constructor(metadata: IMetadata) {
    this.metadata = metadata;
  }
}
