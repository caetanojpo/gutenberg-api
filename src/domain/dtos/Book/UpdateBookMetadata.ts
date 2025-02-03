import { IsString } from "class-validator";
import { IMetadata } from "../../models/Book";

export class UpdateBookMetadataDTO {
  @IsString()
  metadata: IMetadata;

  constructor(metadata: IMetadata) {
    this.metadata = metadata;
  }
}
