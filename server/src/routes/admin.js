import express from 'express'
import asyncHandler from '../utils/asyncHandler.js'
import { requireAuth, requireRole } from '../middleware/auth.js'
import Property from '../models/Property.js'
import Agent from '../models/Agent.js'
import Inquiry from '../models/Inquiry.js'
import Appointment from '../models/Appointment.js'
import Message from '../models/Message.js'

const router = express.Router()

router.get(
  '/metrics',
  requireAuth,
  requireRole('admin'),
  asyncHandler(async (_req, res) => {
    const [properties, agents, inquiries, appointments, messages] =
      await Promise.all([
        Property.countDocuments(),
        Agent.countDocuments(),
        Inquiry.countDocuments(),
        Appointment.countDocuments(),
        Message.countDocuments(),
      ])

    return res.json({
      data: {
        properties,
        agents,
        inquiries,
        appointments,
        messages,
      },
    })
  }),
)

export default router
