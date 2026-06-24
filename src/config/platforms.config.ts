import { PLATFORMS, type Platform } from "./platforms";

export class PlatformsAvailable {
    youtube = false;
    twitch = false;
    kick = false;
    tiktok = false;

    public setPlatformAvailable(platformList: Map<string, string | null>) {
        for (const [platformKey, platformUrl] of platformList) {
            if (!platformUrl) {
                continue;
            }

            this.setPlatform(platformKey.replace("_URL", ""));
        }
    }

    private setPlatform(platform: string) {
        const platformName = platform.toLowerCase() as Platform;

        if (!PLATFORMS.includes(platformName)) {
            return;
        }

        this[platformName] = true;
    }
}
