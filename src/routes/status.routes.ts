import { app } from './api'
import { StatusController } from '../controllers/status.controller'

const controller = new StatusController()

app.post('/status', (c) => {
  controller.streamStatus()
  return c.text('Status changé', 200)
})
