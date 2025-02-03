import { IMetadata } from "../../models/Book";

export class GetBookMetadataDTO {
  metadata: IMetadata;

  constructor(metadata: IMetadata) {
    this.metadata = metadata;
  }
}
