// src/config/env.ts

import "dotenv/config";
import process from "node:process";

class EnvironmentVariable {
  private platforms = new Map<string, string | null>();

  public readonly port: number;
  private readonly sourceUrl: string;

  constructor() {
    const platformsToLoad = ["YOUTUBE", "TWITCH", "KICK", "TIKTOK"];

    try {
      this.port = Number(process.env.PORT) || 3000;

      const sourceUrl = process.env.MEDIAMTX_URL;

      if (!sourceUrl) {
        throw new Error("MEDIAMTX_URL is not defined");
      }

      this.sourceUrl = sourceUrl;

      platformsToLoad.forEach((platform) => {
        const platformUrl = process.env[`${platform}_URL`] || null;
        this.platforms.set(platform.toLowerCase(), platformUrl);
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("Unknown error while loading environment variables");
      }

      process.exit(1);
    }
  }

  public getSourceUrl(): string {
    return this.sourceUrl;
  }

  public getPlatformUrl(platform: string): string | null {
    return this.platforms.get(platform.toLowerCase()) ?? null;
  }
}

export const env = new EnvironmentVariable();