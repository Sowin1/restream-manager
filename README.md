# Restream Manager

Restream Manager is an open-source project for sending a single encoded video feed to multiple streaming platforms.

The project is designed to run with Docker and uses [MediaMTX](https://github.com/bluenviron/mediamtx) as part of the streaming stack.

## Overview

- Restream once, publish everywhere.
- Keep the encoder workload lower by avoiding multiple separate encodes.
- Build on top of open-source tooling that can adapt to different workflows.

## Installation Guide

Choose the setup that fits your workflow:

- Docker Compose is the recommended path for local use and self-hosting.
- Docker Run is useful if you prefer managing the container manually.

### Requirements

- Docker Engine or Docker Desktop
- `docker compose`

### Option 1: Docker Compose

1. Copy `.env.sample` to `.env` and fill in the values you need.
2. Start the stack:

```bash
docker compose up -d --build
```

3. The API starts on the port defined by `PORT` in `.env`.
4. MediaMTX listens on ports `1935` and `9997`.

If you are using Docker Desktop, you can run the same `docker compose` command from its terminal or from your system shell.

### Option 2: Docker Run

If you prefer `docker run`, pass the same environment variables manually:

```bash
docker run \
  -e MEDIAMTX_URL="rtmp://mediamtx:1935/restream/manager" \
  -e PORT="3000" \
  -e AUTH_USERNAME="admin" \
  -e AUTH_PASSWORD="admin123" \
  -e JWT_SECRET="very-long-random-secret" \
  -e TWITCH_URL="rtmp://live.twitch.tv/app/your-stream-key" \
  -e YOUTUBE_URL="" \
  -e KICK_URL="" \
  -e TIKTOK_URL="" \
  ghcr.io/ton-org/restream-manager:latest
```

## Environment Variables

Required:

- `MEDIAMTX_URL`
- `AUTH_USERNAME`
- `AUTH_PASSWORD`
- `JWT_SECRET`

Optional:

- `PORT`
- `TWITCH_URL`
- `YOUTUBE_URL`
- `KICK_URL`
- `TIKTOK_URL`

Notes:

- `MEDIAMTX_URL` should usually be `rtmp://mediamtx:1935/restream/manager` when using the provided Compose file.
- If a platform URL is empty, that platform stays disabled.
- The authentication values protect `/stream/start`, `/stream/stop`, and `/status`.

## Authentication

`/stream/start`, `/stream/stop`, and `/status` are protected with JWT.

1. Set `AUTH_USERNAME`, `AUTH_PASSWORD`, and `JWT_SECRET`.
2. Request a token with `POST /auth/login` and a JSON body:

```json
{
  "username": "your-username",
  "password": "your-password"
}
```

3. Send the token as `Authorization: Bearer <token>` on protected routes.
4. The token does not expire automatically. It stays valid until `JWT_SECRET` changes.

## Encoded Stream

- Video: H264
- Audio: AAC

## Support

If you want to support a French esports organization that runs tournaments across different games, take a look at [Greenstar Esport](https://greenstar-esport.com).

## Contributing

If you plan to contribute, please keep changes focused and easy to review.
