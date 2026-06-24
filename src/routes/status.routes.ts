import { app } from './api'
import { StatusController } from '../controllers/status.controller'

const controller = new StatusController()

app.post('/status', (c) => {
  return c.json(controller.streamStatus(), 200)
})
