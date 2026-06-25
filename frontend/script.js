function handlePlatformTokensSubmit(platformTokens) {
  console.log("Platform tokens submitted:", platformTokens);
}

const platformTokenForm = document.querySelector("#platform-token-form");

platformTokenForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(platformTokenForm);
  const setupValues = {
    AUTH_USERNAME: formData.get("AUTH_USERNAME")?.trim() ?? "",
    AUTH_PASSWORD: formData.get("AUTH_PASSWORD")?.trim() ?? "",
    JWT_SECRET: formData.get("JWT_SECRET")?.trim() ?? "",
    TWITCH_TOKEN: formData.get("TWITCH_TOKEN")?.trim() ?? "",
    YOUTUBE_TOKEN: formData.get("YOUTUBE_TOKEN")?.trim() ?? "",
    KICK_TOKEN: formData.get("KICK_TOKEN")?.trim() ?? "",
    TIKTOK_TOKEN: formData.get("TIKTOK_TOKEN")?.trim() ?? "",
  };

  handlePlatformTokensSubmit(setupValues);
});
