import { app } from './api';
import { StreamController } from '../controllers/stream.controller';

const controller = new StreamController();


app.post('/stream/start', (c) => {
    controller.streamStart()
    return c.text('Stream commencé', 200)
})

app.post('/stream/stop', (c) => {
    controller.streamStop()
    return c.text('Stream fini', 200)
})
