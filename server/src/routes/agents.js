import express from 'express'
import Agent from '../models/Agent.js'
import Property from '../models/Property.js'
import asyncHandler from '../utils/asyncHandler.js'
import { requireAuth, requireRole } from '../middleware/auth.js'

const router = express.Router()

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const agents = await Agent.find().sort({ createdAt: -1 })
    return res.json({ data: agents })
  }),
)

router.get(
  '/me',
  requireAuth,
  requireRole('agent', 'admin'),
  asyncHandler(async (req, res) => {
    const agent = await Agent.findOne({ user: req.user.id })
    if (!agent) {
      return res.status(404).json({ error: 'Agent profile not found' })
    }
    return res.json({ data: agent })
  }),
)

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const agent = await Agent.findById(req.params.id)
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' })
    }
    const properties = await Property.find({ agent: agent._id })
    return res.json({ data: { ...agent, properties } })
  }),
)

router.post(
  '/',
  requireAuth,
  requireRole('agent', 'admin'),
  asyncHandler(async (req, res) => {
    const agent = await Agent.create(req.body)
    return res.status(201).json({ data: agent })
  }),
)

router.put(
  '/:id',
  requireAuth,
  requireRole('agent', 'admin'),
  asyncHandler(async (req, res) => {
    const agent = await Agent.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' })
    }
    return res.json({ data: agent })
  }),
)

export default router
