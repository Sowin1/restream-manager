import { PLATFORMS, type Platform } from "./platforms";

export class PlatformsChoose {
    youtube = false;
    twitch = false;
    kick = false;
    tiktok = false;

    setChoose(platform: Platform) {
        if (!PLATFORMS.includes(platform)) {
            return;
        }

        this[platform] = !this[platform];
    }
}
