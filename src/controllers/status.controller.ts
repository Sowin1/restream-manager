import { streamService } from "../../app";

export class StatusController {
    public streamStatus() {
        return streamService.getStatus();
    }
}
