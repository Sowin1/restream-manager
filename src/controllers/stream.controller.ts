import { streamService } from "../../app";

export class StreamController {

    public streamStart() {
        streamService.start();
    }
    public streamStop() {
        streamService.stop();
    }
}