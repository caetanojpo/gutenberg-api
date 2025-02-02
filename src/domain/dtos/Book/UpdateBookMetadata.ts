import { IsString } from "class-validator";

export class UpdateBookMetadataDTO {
  @IsString()
  metadata: string;

  constructor(metadata: string) {
    this.metadata = metadata;
  }
}
