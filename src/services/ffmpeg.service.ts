import { spawn } from "child_process";

export class FfmpegService {
  public startingFfmpeg(inputUrl: string, rtmpUrl: string) {
    spawn("ffmpeg", [
      "-i",
      inputUrl,
      "-c:v",
      "copy",
      "-c:a",
      "copy",
      "-f",
      "flv",
      rtmpUrl,
    ]);
  }
}
