import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import authRoutes from './routes/auth.js'
import propertyRoutes from './routes/properties.js'
import agentRoutes from './routes/agents.js'
import inquiryRoutes from './routes/inquiries.js'
import appointmentRoutes from './routes/appointments.js'
import messageRoutes from './routes/messages.js'
import adminRoutes from './routes/admin.js'
import userRoutes from './routes/users.js'
import { notFound, errorHandler } from './middleware/error.js'

const app = express()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(',') || '*',
    credentials: true,
  }),
)
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json({ limit: '1mb' }))
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 200,
  }),
)

app.get('/api/health', (_req, res) => {
  res.json({ data: { status: 'ok', time: new Date().toISOString() } })
})

app.get('/', (_req, res) => {
  res.json({
    data: {
      status: 'ok',
      message: 'Maithili Estates API',
      health: '/api/health',
    },
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/properties', propertyRoutes)
app.use('/api/agents', agentRoutes)
app.use('/api/inquiries', inquiryRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)

export default app
