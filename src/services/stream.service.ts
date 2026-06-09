export class StreamService {
  private isLive = false;

  start() {
    this.isLive = true;
  }

  stop() {
    this.isLive = false;
  }

  getStatus() {
    return this.isLive;
  }
}