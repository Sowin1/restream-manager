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

  constructor() {
    for (const platform of PLATFORMS) {
      if (env.getPlatformUrl(platform)) {
        this.platformsAvailable[platform] = true;
      }
    }
  }

  start() {
    this.isLive = true;
    const platform: Platform[] = this.getSelectedAvailablePlatforms(
      this.platformsAvailable,
      this.platformsChoose,
    );
    platform.forEach((platform) => {
      this.ffmpeg.startFfmpeg(platform);
    });
  }

  stop() {
    this.isLive = false;
  }

  getStatus() {
    return this.isLive;
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
