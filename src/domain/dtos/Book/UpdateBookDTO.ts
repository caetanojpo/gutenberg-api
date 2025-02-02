import { IsString } from "class-validator";

export class UpdateBookDTO {
  @IsString()
  content: string;
  @IsString()
  metadata: string;

  constructor(content: string, metadata: string) {
    this.content = content;
    this.metadata = metadata;
  }
}
