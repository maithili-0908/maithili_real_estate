import express from 'express'
import Inquiry from '../models/Inquiry.js'
import Property from '../models/Property.js'
import asyncHandler from '../utils/asyncHandler.js'
import { requireAuth, requireRole } from '../middleware/auth.js'

const router = express.Router()

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { propertyId, name, email, message, phone } = req.body
    if (!propertyId || !name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' })
    }
    const property = await Property.findById(propertyId)
    if (!property) {
      return res.status(404).json({ error: 'Property not found' })
    }
    const inquiry = await Inquiry.create({
      property: property.id,
      agent: property.agent,
      name,
      email,
      phone,
      message,
    })
    return res.status(201).json({ data: inquiry })
  }),
)

router.get(
  '/',
  requireAuth,
  requireRole('agent', 'admin'),
  asyncHandler(async (_req, res) => {
    const inquiries = await Inquiry.find()
      .sort({ createdAt: -1 })
      .lean()
    return res.json({ data: inquiries })
  }),
)

export default router
