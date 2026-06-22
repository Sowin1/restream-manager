// src/config/env.ts

import "dotenv/config";
import process from "node:process";
import { PLATFORMS } from "./platforms";

class EnvironmentVariable {
  private platforms = new Map<string, string | null>();

  public readonly port: number;
  private readonly sourceUrl: string;
  private readonly authUsername: string;
  private readonly authPassword: string;
  private readonly jwtSecret: string;

  constructor() {
    try {
      this.port = Number(process.env.PORT) || 3000;

      const sourceUrl = process.env.MEDIAMTX_URL;

      if (!sourceUrl) {
        throw new Error("MEDIAMTX_URL is not defined");
      }

      this.sourceUrl = sourceUrl;

      const authUsername = process.env.AUTH_USERNAME;
      if (!authUsername) {
        throw new Error("AUTH_USERNAME is not defined");
      }
      this.authUsername = authUsername;

      const authPassword = process.env.AUTH_PASSWORD;
      if (!authPassword) {
        throw new Error("AUTH_PASSWORD is not defined");
      }
      this.authPassword = authPassword;

      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined");
      }
      this.jwtSecret = jwtSecret;

      PLATFORMS.forEach((platform) => {
        const envKey = `${platform.toUpperCase()}_URL`;
        const platformUrl = process.env[envKey] || null;
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

  public getAuthUsername(): string {
    return this.authUsername;
  }

  public getAuthPassword(): string {
    return this.authPassword;
  }

  public getJwtSecret(): string {
    return this.jwtSecret;
  }
}

export const env = new EnvironmentVariable();
