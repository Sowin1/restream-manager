import { spawn } from "child_process";
import { env } from "../config/env";
import { processManager } from "../../app";
import type { Platform } from "../config/platforms";

export class FfmpegService {


  public startFfmpeg(platform: Platform) {
    const inputUrl = this.getInputUrl();
    const rtmpUrl = this.getRtmpUrl(platform);
    const args = this.buildFfmpegArgs(inputUrl, rtmpUrl);

    const process = spawn("ffmpeg", args);
    processManager.add(platform, process);
  }

  private getInputUrl(): string {
    const inputUrl = env.getSourceUrl();

    if (!inputUrl) {
      throw new Error(`Cannot retrieve the source url`);
    }

    return inputUrl;
  }

  private getRtmpUrl(platform: Platform): string {
    const outputUrl = env.getPlatformUrl(platform);

    if (!outputUrl) {
      throw new Error(`Platform ${platform} is not initialized`);
    }

    return outputUrl;
  }

  private buildFfmpegArgs(inputUrl: string, rtmpUrl: string): string[] {
    return [
      "-i", inputUrl,
      "-c:v", "copy",
      "-c:a", "copy",
      "-f", "flv",
      rtmpUrl
    ];
  }
}
