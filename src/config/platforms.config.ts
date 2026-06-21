export class PlatformsAvailable {
    youtube: boolean = false;
    twitch: boolean = false;
    kick: boolean = false;
    tiktok: boolean = false;

    public setPlatformAvailable(platformList: Map<string, string | null>) {
        for (const [platformKey, platformUrl] of platformList) {
            if (!platformUrl) {
                continue;
            }

            this.setPlatform(platformKey.replace("_URL", ""));
        }
    }

    private setPlatform(platform: string) {
        const platformName = platform.toLowerCase();

        if (platformName === "youtube") this.youtube = true;
        if (platformName === "twitch") this.twitch = true;
        if (platformName === "kick") this.kick = true;
        if (platformName === "tiktok") this.tiktok = true;
    }
}
