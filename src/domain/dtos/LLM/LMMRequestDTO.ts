import { IsEnum, IsString } from "class-validator";
import { LLMAction } from "../../enums/LLMActions";

export class LLMRequestDTO {
  @IsString()
  id: string;

  @IsEnum(LLMAction)
  action: LLMAction;

  constructor(id: string, action: LLMAction) {
    this.id = id;
    this.action = action;
  }
}
