import { IsString } from "class-validator";

export class UpdateBookContentDTO {
  @IsString()
  content: string;

  constructor(content: string) {
    this.content = content;
  }
}
