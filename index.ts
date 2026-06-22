import { serve } from '@hono/node-server'
import { env } from './src/config/env'
import { app } from './src/routes/api'
import './src/routes/streamStart.routes'
import './src/routes/status.routes'

serve({
  fetch: app.fetch,
  port: env.port,
})
