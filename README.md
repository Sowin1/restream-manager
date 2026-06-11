# Restream Manager

Restream Manager is an open-source project for sending a single encoded video feed to multiple streaming platforms.

The project is designed to work with Docker and uses [MediaMTX](https://github.com/bluenviron/mediamtx) as part of the streaming stack.

## Overview

- Restream once, publish everywhere.
- Keep the encoder workload lower by avoiding multiple separate encodes.
- Build on top of open-source tooling that can be adapted to different workflows.

## Project Status

This project is still evolving.

- Some parts of the architecture may change.
- The implementation may contain rough edges or room for improvement.
- Contributions, refactors, and suggestions are welcome.

## Getting Started

If you are new to the project, the best first step is to explore the source code and the streaming service implementation in [`src/services/stream.service.ts`](src/services/stream.service.ts).

## Encoded Stream

Video : H264
Audio : AAC

## Support

If you want to support a French esports organization that runs tournaments across different games, take a look at [Greenstar Esport](https://greenstar-esport.com).

## Contributing

If you plan to contribute, please follow the project guidelines and keep changes focused and easy to review.

