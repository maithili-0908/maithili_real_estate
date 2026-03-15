import express from 'express'
import Message from '../models/Message.js'
import Agent from '../models/Agent.js'
import asyncHandler from '../utils/asyncHandler.js'
import { requireAuth, requireRole } from '../middleware/auth.js'

const router = express.Router()

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { agentId, name, email, subject, message } = req.body
    if (!agentId || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' })
    }
    const agent = await Agent.findById(agentId)
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' })
    }
    const record = await Message.create({
      agent: agent.id,
      name,
      email,
      subject,
      message,
    })
    return res.status(201).json({ data: record })
  }),
)

router.get(
  '/',
  requireAuth,
  requireRole('agent', 'admin'),
  asyncHandler(async (_req, res) => {
    const messages = await Message.find().sort({ createdAt: -1 }).lean()
    return res.json({ data: messages })
  }),
)

export default router
