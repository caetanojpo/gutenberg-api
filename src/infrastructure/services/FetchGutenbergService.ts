import axios from "axios";
import { parseStringPromise } from "xml2js";
import { Book, IBook, IMetadata } from "../../domain/models/Book";
import { logger } from "../logger";

export class GutenbergService {
  private async fetchMetadata(gutenbergId: string): Promise<IBook | null> {
    try {
      const metadataUrl = `https://www.gutenberg.org/ebooks/${gutenbergId}.opds`;
      const response = await axios.get(metadataUrl);
      const xmlData = response.data;

      const jsonData = await parseStringPromise(xmlData, {
        explicitArray: false,
      });

      const feed = jsonData.feed;
      if (!feed) {
        console.error("No book entries found in OPDS feed.");
        return null;
      }
      const title = feed.title || "";
      let author: string = "";
      let coverPictureUrl = `https://www.gutenberg.org/cache/epub/${gutenbergId}/pg${gutenbergId}.cover.medium.jpg`;
      let published = "";
      let downloads = "";
      let language = "";
      let category = "";
      let rights = "";

      if (feed.entry[0]?.content?.div?.p) {
        const otherInfos: string[] = feed.entry[0].content.div.p as string[];

        author = this.extractField("Author:", otherInfos);
        published = this.extractField("Published:", otherInfos);
        downloads = this.extractField("Downloads:", otherInfos).split(" ")[1];
        language = this.extractField("Language:", otherInfos);
        category = this.extractField("Category:", otherInfos);
        rights = this.extractField("Rights:", otherInfos);
      }

      const metadata: IMetadata = {
        published,
        downloads: parseInt(downloads),
        language,
        category,
        rights,
      };

      return new Book({
        gutenbergId,
        title,
        author,
        coverPictureUrl,
        metadata,
      });
    } catch (error) {
      console.error("Error fetching metadata:", error);
      return null;
    }
  }

  private async fetchContent(gutenbergId: string): Promise<string> {
    const contentUrl = `https://www.gutenberg.org/files/${gutenbergId}/${gutenbergId}-0.txt`;
    const response = await axios.get(contentUrl);
    return response.data;
  }

  public async fetchBookData(gutenbergId: string): Promise<IBook | null> {
    const content = await this.fetchContent(gutenbergId);
    const bookData = await this.fetchMetadata(gutenbergId);

    if (!bookData || !content) return null;

    return {
      gutenbergId: gutenbergId,
      title: bookData.title,
      author: bookData.author,
      coverPictureUrl: bookData.coverPictureUrl,
      content: content,
      metadata: bookData.metadata,
    };
  }

  private extractField(field: string, toBeExtracted: any): string {
    const found = toBeExtracted.find(
      (info: string | string[]) =>
        typeof info === "string" && info.includes(field)
    );
    return found || "";
  }
}

//TODO LOGGERS HERE
