const platformBaseUrls = {
  TWITCH_URL: "rtmp://live.twitch.tv/app/",
  YOUTUBE_URL: "rtmp://a.rtmp.youtube.com/live2/",
  KICK_URL: "rtmps://fa723fc1b171.global-contribute.live-video.net/app/",
  TIKTOK_URL: "rtmp://push-rtmp.tiktokcdn.com/live/",
};

function handlePlatformTokensSubmit(platformTokens) {
  const setupValues = {
    AUTH_USERNAME: platformTokens.AUTH_USERNAME,
    AUTH_PASSWORD: platformTokens.AUTH_PASSWORD,
    JWT_SECRET: platformTokens.JWT_SECRET,
    TWITCH_URL: buildPlatformUrl(platformBaseUrls.TWITCH_URL, platformTokens.TWITCH_TOKEN),
    YOUTUBE_URL: buildPlatformUrl(platformBaseUrls.YOUTUBE_URL, platformTokens.YOUTUBE_TOKEN),
    KICK_URL: buildPlatformUrl(platformBaseUrls.KICK_URL, platformTokens.KICK_TOKEN),
    TIKTOK_URL: buildPlatformUrl(platformBaseUrls.TIKTOK_URL, platformTokens.TIKTOK_TOKEN),
  };

  startDocker(setupValues);
}

function buildPlatformUrl(baseUrl, token) {
  return token ? baseUrl + token : "";
}

function shellValue(value) {
  return `"${String(value).replaceAll("\\", "\\\\").replaceAll('"', '\\"')}"`;
}

function startDocker(links) {
  // Call backend api with given value
}

const platformTokenForm = document.querySelector("#platform-token-form");

platformTokenForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(platformTokenForm);
  const platformTokens = {
    AUTH_USERNAME: formData.get("AUTH_USERNAME")?.trim() ?? "",
    AUTH_PASSWORD: formData.get("AUTH_PASSWORD")?.trim() ?? "",
    JWT_SECRET: formData.get("JWT_SECRET")?.trim() ?? "",
    TWITCH_TOKEN: formData.get("TWITCH_TOKEN")?.trim() ?? "",
    YOUTUBE_TOKEN: formData.get("YOUTUBE_TOKEN")?.trim() ?? "",
    KICK_TOKEN: formData.get("KICK_TOKEN")?.trim() ?? "",
    TIKTOK_TOKEN: formData.get("TIKTOK_TOKEN")?.trim() ?? "",
  };

  handlePlatformTokensSubmit(platformTokens);
});
