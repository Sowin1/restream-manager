export const PLATFORMS = ["youtube", "twitch", "kick", "tiktok"] as const;

export type Platform = (typeof PLATFORMS)[number];
