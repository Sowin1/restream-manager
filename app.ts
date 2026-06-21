import { ProcessManager } from "./src/managers/processManager"
import { StreamService } from "./src/services/stream.service"

export const processManager = new ProcessManager();
export const streamService = new StreamService();