import express from 'express'
import User from '../models/User.js'
import Agent from '../models/Agent.js'
import Property from '../models/Property.js'
import asyncHandler from '../utils/asyncHandler.js'
import { requireAuth, requireRole } from '../middleware/auth.js'

const router = express.Router()

router.get(
  '/',
  requireAuth,
  requireRole('admin'),
  asyncHandler(async (_req, res) => {
    const users = await User.find().sort({ createdAt: -1 })
    return res.json({ data: users })
  }),
)

router.put(
  '/:id',
  requireAuth,
  requireRole('admin'),
  asyncHandler(async (req, res) => {
    const { role } = req.body
    if (!role) {
      return res.status(400).json({ error: 'Role is required' })
    }
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    user.role = role
    await user.save()

    if (role === 'agent') {
      const existingAgent = await Agent.findOne({ user: user.id })
      if (!existingAgent) {
        await Agent.create({
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: 'Maithili Estates Agent',
          transactions: 0,
          rating: 4.7,
          bio: 'Agent profile created by admin.',
          user: user.id,
        })
      }
    }

    return res.json({ data: user })
  }),
)

router.delete(
  '/:id',
  requireAuth,
  requireRole('admin'),
  asyncHandler(async (req, res) => {
    if (req.user.id === req.params.id) {
      return res.status(400).json({ error: 'Cannot delete yourself' })
    }
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    if (user.role === 'agent') {
      const agent = await Agent.findOne({ user: user.id })
      if (agent) {
        await Property.updateMany(
          { agent: agent.id },
          { $unset: { agent: '' } },
        )
        await Agent.deleteOne({ _id: agent.id })
      }
    }

    await User.deleteOne({ _id: user.id })
    return res.json({ data: { id: user.id } })
  }),
)

export default router
