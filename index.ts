import { serve } from '@hono/node-server'
import { env } from './src/config/env'
import { app } from './src/routes/api'
import './src/routes/streamStart.routes'
import './src/routes/status.routes'
import { logger } from './src/utils/logger'

serve({
  fetch: app.fetch,
  port: env.port,
})
logger.info("API Server started")