class PlatformsChoose {
    youtube: boolean = false;
    twitch: boolean = false;
    kick: boolean = false;

    setChoose(platform: keyof Pick<PlatformsChoose, "youtube" | "twitch" | "kick">) {
        this[platform] = !this[platform];
    }
}
