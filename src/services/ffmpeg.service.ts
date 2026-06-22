import { spawn } from "child_process";
import { env } from "../config/env";
import { processManager } from "../../app";
import type { Platform } from "../config/platforms";
import { logger } from "../utils/logger";

export class FfmpegService {
  public startFfmpeg(platform: Platform) {
    const inputUrl = this.getInputUrl();
    const rtmpUrl = this.getRtmpUrl(platform);
    const args = this.buildFfmpegArgs(inputUrl, rtmpUrl);
    const childLogger = logger.child({ platform });

    const process = spawn("ffmpeg", args, {
      stdio: ["ignore", "pipe", "pipe"],
    });

    childLogger.info({ pid: process.pid, args }, "Starting ffmpeg process");

    process.on("error", (error) => {
      childLogger.error(
        { err: error },
        "ffmpeg process failed to spawn or crashed unexpectedly",
      );
    });

    process.on("exit", (code, signal) => {
      if (code === 0 && !signal) {
        childLogger.info({ code, signal }, "ffmpeg process exited");
        return;
      }

      childLogger.warn(
        { code, signal },
        "ffmpeg process exited unexpectedly",
      );
    });

    process.stderr?.on("data", (chunk: Buffer) => {
      this.logStreamOutput(childLogger, chunk);
    });

    processManager.add(platform, process);
  }

  public stop(platform: Platform) {
    if (processManager.isRunning(platform)) {
      logger.info({ platform }, "Stopping ffmpeg process");
      processManager.stop(platform);
    }
  }

  private getInputUrl(): string {
    const inputUrl = env.getSourceUrl();

    if (!inputUrl) {
      logger.warn("Cannot retrieve the source url")
      throw new Error(`Cannot retrieve the source url`);
    }
    logger.info("Input url well connected")
    return inputUrl;
  }

  private getRtmpUrl(platform: Platform): string {
    const outputUrl = env.getPlatformUrl(platform);

    if (!outputUrl) {
      logger.error({
        platform: platform,
      }, `Platform ${platform} has not be well initialized`)
      throw new Error(`Platform ${platform} is not well initialized`);
    }

    logger.info({
      platform: platform,
      status: true,
    }, "Platform initialized and ready to diffuse")

    return outputUrl;
  }

  private buildFfmpegArgs(inputUrl: string, rtmpUrl: string): string[] {
    return [
      "-i", inputUrl,
      "-c:v", "copy",
      "-c:a", "copy",
      "-f", "flv",
      rtmpUrl,
    ];
  }

  // Logs

  private readonly ffmpegLogPatterns = [
    /error/i,
    /fatal/i,
    /failed/i,
    /invalid/i,
    /not found/i,
    /no such file/i,
    /connection/i,
    /refused/i,
    /timeout/i,
    /permission denied/i,
    /conversion failed/i,
  ];

  private logStreamOutput(
    childLogger: typeof logger,
    chunk: Buffer,
  ) {
    const output = chunk.toString("utf8").trim();

    if (!output) {
      return;
    }

    for (const line of output.split(/\r?\n/)) {
      if (!line.trim()) {
        continue;
      }

      if (!this.shouldLogFfmpegLine(line)) {
        continue;
      }

      childLogger.warn({ line }, "ffmpeg output");
    }
  }

  private shouldLogFfmpegLine(line: string): boolean {
    return this.ffmpegLogPatterns.some((pattern) => pattern.test(line));
  }
}
