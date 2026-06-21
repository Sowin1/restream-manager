import { ChildProcess } from "node:child_process";

class ProcessManager {
    private processes = new Map<string, ChildProcess>();

    public add(plateform: string, process: ChildProcess) {
        this.processes.set(plateform, process)
    }

    public isRunning(plateform: string): boolean {
        return this.processes.has(plateform);
    }

    public stop(plateform: string) {
        this.processes.get(plateform)?.kill("SIGTERM");
        this.processes.delete(plateform);
    }

    // public restart(plateform: string);
}