import { PlatformsAvailable } from "../config/platforms.config";
import { PlatformsChoose } from "../config/platformsChoose.config";
import { env } from "../config/env";
import { PLATFORMS, type Platform } from "../config/platforms";
import { FfmpegService } from "../services/ffmpeg.service";

export class StreamService {
  private isLive = false;
  private platformsAvailable = new PlatformsAvailable();
  private platformsChoose = new PlatformsChoose();
  private ffmpeg = new FfmpegService();
  private runningPlatforms: Platform[] = [];

  constructor() {
    for (const platform of PLATFORMS) {
      if (env.getPlatformUrl(platform)) {
        this.platformsAvailable[platform] = true;
        // temporary
        this.platformsChoose[platform] = true;
        // temporary
      }
    }
  }

  start() {
    this.isLive = true;
    this.runningPlatforms = this.getSelectedAvailablePlatforms(
      this.platformsAvailable,
      this.platformsChoose,
    );
    this.runningPlatforms.forEach((platform) => {
      this.ffmpeg.startFfmpeg(platform);
    });
  }

  stop() {
    this.runningPlatforms.forEach((platform) => {
      this.ffmpeg.stop(platform);
    });
    this.runningPlatforms = [];
    this.isLive = false;
  }

  getStatus() {
    const running: Record<"stream" | Platform, boolean> = {
      stream: this.isLive,
      youtube: false,
      twitch: false,
      kick: false,
      tiktok: false,
    };

    this.runningPlatforms.forEach((platform) => {
      running[platform] = true;
    });

    return running;
  }

  public getSelectedAvailablePlatforms(
    platformsAvailable: PlatformsAvailable,
    platformsChoose: PlatformsChoose,
  ): Platform[] {
    return PLATFORMS.filter((platform) => {
      return platformsAvailable[platform] && platformsChoose[platform];
    });
  }
}
