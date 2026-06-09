class PlatformsAvailable {
    youtube: boolean = false;
    twitch: boolean = false;
    kick: boolean = false;

    public setPlatformAvailable(plateformList: Map<string, string | null>) {
        for (const [platform, plateformUrl] of plateformList) {
            if (!plateformUrl) {
                continue;
            }
            this.setPlatform(platform.replace("_URL", ""));
        }
    }

    private setPlatform(platform: string) {
        const platformName = platform.toLowerCase();

        if (platformName === "youtube") this.youtube = true;
        if (platformName === "twitch") this.twitch = true;
        if (platformName === "kick") this.kick = true;
    }
}
