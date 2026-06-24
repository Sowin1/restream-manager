import { ProcessManager } from "./src/managers/processManager"
import { StreamService } from "./src/services/stream.service"
import { logger } from "./src/utils/logger";

export const processManager = new ProcessManager();
logger.info(
    "Process manager started"
)
export const streamService = new StreamService();