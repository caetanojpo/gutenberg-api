import { LLMAction } from "../../domain/enums/LLMActions";

export const prompts = {
  [LLMAction.KEYWORDS]: `Identify the key words from the following book excerpt. Extract the most relevant terms that summarize its main topics and themes:\n\n{{book}}\n`,
  [LLMAction.SUMMARY]: `Summarize the plot of the following book. Focus on the main storyline, key events, and central characters:\n\n{{book}}\n`,
  [LLMAction.SENTIMENT]: `Analyze the overall sentiment of the following book. Indicate whether the tone is positive, negative, or neutral, and provide a brief explanation:\n\n{{book}}\n`,
};
