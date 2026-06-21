import { PlatformsAvailable } from "../config/platforms.config";
import { PlatformsChoose } from "../config/platformsChoose.config";

export class StreamService {
  private isLive = false;

  start() {
    this.isLive = true;
    PlatformsChoose
    PlatformsAvailable

  }

  stop() {
    this.isLive = false;
  }

  getStatus() {
    return this.isLive;
  }
}