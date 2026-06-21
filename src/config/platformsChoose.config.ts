export class PlatformsChoose {
    youtube: boolean = false;
    twitch: boolean = false;
    kick: boolean = false;
    tiktok: boolean = false;

    setChoose(platform: keyof Pick<PlatformsChoose, "youtube" | "twitch" | "kick" | "tiktok">) {
        this[platform] = !this[platform];
    }
}
