import Groq from "groq-sdk";
import { env } from "../env";

export class GroqService {
  private readonly groq: Groq;

  constructor() {
    this.groq = new Groq({ apiKey: env.groqKey });
  }

  async getChatCompletion(prompt: string) {
    const response = await this.groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      max_tokens: 2048,
      stream: false,
    });
    return response.choices[0]?.message?.content || "";
  }
}
